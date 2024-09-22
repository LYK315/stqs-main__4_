import { Router, Request, Response } from 'express';
import { ContractList } from '@shared/Types/contract';

const router = Router();
const API_URL = 'https://api.spacetraders.io/v2';


/*===================== Controllers =====================*/
async function getContractList(): Promise<ContractList> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`
    }
  };

  try {
    const response = await fetch(`${API_URL}/my/contracts`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch contract list data. Status: ${response.status}`);
    }
    return await response.json() as ContractList;
  } catch (error) {
    console.error('Error fetching contract list data:', error);
    throw error;
  }
};


/*===================== Services =====================*/
router.get('/getAll', async (req: Request, res: Response) => {
  try {
    const contractList = await getContractList();
    res.json(contractList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


export default router;
