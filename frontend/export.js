import { MOCK_LISTINGS } from './src/utils/mockData.js';
import fs from 'fs';
fs.writeFileSync('mocks.json', JSON.stringify(MOCK_LISTINGS, null, 2));
