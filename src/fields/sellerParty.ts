import { Field } from 'payload/types';
import { partyCommonFields } from './CustomFields';
import {getLabelTranslations} from "../utilities/translate";

const sellerPartyField: Field = {
  name: 'seller',
  type: 'group', // required
  label: getLabelTranslations('seller'),
  interfaceName: 'Party', // optional
  fields: partyCommonFields,
};

export default sellerPartyField;
