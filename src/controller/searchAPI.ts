import { Request, Response } from 'express';
import State, { StateDocument } from '../model/stateLgaModel';
import ApiError from '../utils/apiError';

// Search regions
export const searchRegions = async (req: Request, res: Response): Promise<void> => {
  try {
    const regions: StateDocument[] = await State.distinct('geo_politcal_zone');
    res.json(regions);
  } catch (error) {
    console.error('Error searching regions:', error);
    throw new ApiError(500, 'An error occurred while searching regions');
  }
};

// Search states by region
export const searchStatesByRegion = async (req: Request, res: Response): Promise<void> => {
  const { region } = req.params;
  try {
    const states: StateDocument[] = await State.find({ geo_politcal_zone: region }, 'state');
    res.json(states);
  } catch (error) {
    console.error('Error searching states by region:', error);
    throw new ApiError(500, 'An error occurred while searching states by region');
  }
};

// Search LGAs by state
export const searchLGAsByState = async (req: Request, res: Response): Promise<void> => {
  const { state } = req.params;
  try {
    const stateData: StateDocument | null = await State.findOne({ state }, 'lgas');
    if (stateData) {
      res.json(stateData.lgas);
    } else {
      throw new ApiError(404, 'State not found');
    }
  } catch (error) {
    console.error('Error searching LGAs by state:', error);
    throw new ApiError(500, 'An error occurred while searching LGAs by state');
  }
};

// Get all states with pagination
export const getAllStates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sortBy, fields } = req.query;
    const sortOptions = getSortOptions(sortBy as string);
    const projection = getProjection(fields as string);

    const states: StateDocument[] = await State.find({}, projection).sort(sortOptions).exec();
    res.json(states);
  } catch (error) {
    console.error('Error getting all states:', error);
    throw new ApiError(500, 'An error occurred while retrieving all states');
  }
};

const getSortOptions = (sortBy: string): Record<string, any> => {
  const sortOptions: Record<string, any> = {};

  if (sortBy) {
    const fields = sortBy.split(',');
    fields.forEach((field) => {
      let sortOrder = 1;
      if (field.startsWith('-')) {
        sortOrder = -1;
        field = field.substring(1);
      }
      sortOptions[field] = sortOrder;
    });
  }

  return sortOptions;
};

const getProjection = (fields: string): Record<string, any> => {
  const projection: Record<string, any> = {};

  if (fields) {
    const fieldList = fields.split(',');
    fieldList.forEach((field) => {
      projection[field] = 1;
    });
  }

  return projection;
};


// Get information about a specific state
export const getOneState = async (req: Request, res: Response): Promise<void> => {
  const { state } = req.params;
  try {
    const stateFound: StateDocument | null = await State.findOne({ state: state });
    if (stateFound) {
      res.json(stateFound);
    } else {
      throw new ApiError(404, 'State not found');
    }
  } catch (error) {
    console.error('Error getting state:', error);
    throw new ApiError(500, 'An error occurred while retrieving state information');
  }
};

// Get all LGAs
export const getAllLGAs = async (req: Request, res: Response): Promise<void> => {
  try {
    let query = State.find({}, 'lgas');

    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;
    const skip = (page - 1) * perPage;
    query = query.skip(skip).limit(perPage);

    // Sorting
    const sortBy = req.query.sortBy as string;
    if (sortBy) {
      query = query.sort(sortBy);
    }

    // Filtering
    const filter = req.query.filter as string;
    if (filter) {
      query = query.find({ lgas: { $regex: filter, $options: 'i' } });
    }

    // Execute the query
    const lgas = await query.exec();

    res.json(lgas);
  } catch (error) {
    console.error('Error getting all LGAs:', error);
    throw new ApiError(500, 'An error occurred while retrieving all LGAs');
  }
};

// Get information about a specific LGA
export const getOneLGA = async (req: Request, res: Response): Promise<void> => {
  const { lga } = req.params;
  try {
    const state: StateDocument | null = await State.findOne({ lgas: lga });
    if (state) {
      const lgaInfo = {
        state: state.state,
        lgas: lga
      };
      res.json(lgaInfo);
    } else {
      throw new ApiError(404, 'LGA not found');
    }
  } catch (error) {
    console.error('Error getting LGA:', error);
    throw new ApiError(500, 'An error occurred while retrieving LGA information');
  }
};

