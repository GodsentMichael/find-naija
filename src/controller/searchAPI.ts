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


// Additional metadata: Filter and sort states or LGAs by specified metadata
// export const filterAndSortByMetadata = async (req: Request, res: Response): Promise<void> => {
//   const { metadata, value, sortBy, sortOrder } = req.query;

//   try {
//     const query: any = {};
//     query[metadata] = value;

//     let sortQuery: any = {};
//     if (sortBy) {
//       sortQuery[sortBy] = sortOrder === 'desc' ? -1 : 1;
//     }

//     const states: StateDocument[] = await State.find(query).sort(sortQuery);
//     res.json(states);
//   } catch (error) {
//     console.error('Error filtering and sorting by metadata:', error);
//     throw new ApiError(500, 'An error occurred while filtering and sorting by metadata');
//   }
// };

