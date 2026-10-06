// The docs' page finder index, served once as a static file instead of being
// serialized into every page. The palette fetches it the first time it opens.
import { searchIndex } from '../lib/site';

export const GET = () => Response.json(searchIndex);
