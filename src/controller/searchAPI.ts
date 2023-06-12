import { Request, Response } from 'express';
import State, { StateDocument } from '../model/stateLgaModel';
import ApiError from '../utils/apiError';

// Search regions
export const searchRegions = async (req: Request, res: Response): Promise<void> => {
  try {
    const regions: string[] = await State.distinct('geo_politcal_zone');
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
  const { page = 1, perPage = 10 } = req.query;
  const skipCount = (Number(page) - 1) * Number(perPage);

  try {
    const totalCount = await State.countDocuments();
    const states: StateDocument[] = await State.find()
      .skip(skipCount)
      .limit(Number(perPage));

    res.json({
      states,
      totalCount,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / Number(perPage)),
    });
  } catch (error) {
    console.error('Error getting all states:', error);
    throw new ApiError(500, 'An error occurred while retrieving all states');
  }
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


