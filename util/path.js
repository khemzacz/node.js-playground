import { dirname } from 'path';
import process from 'process';

export default dirname(process.report.filename);