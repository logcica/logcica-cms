import { Field } from "payload/types";

export const producerPartyField: Field = {
  name: 'producer',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: [
    {
      name: 'organisation',
      type: 'relationship',
      relationTo: 'organisations',
      hasMany: false,
    },
    {
      name: 'partnership',
      type: 'relationship',
      relationTo: 'partnerships',
      hasMany: false,
    }
  ],
};

export const ownerPartyField: Field = {
  name: 'owner',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: [
    {
      name: 'organisation',
      type: 'relationship',
      relationTo: 'organisations',
      hasMany: false,
    },
    {
      name: 'partnership',
      type: 'relationship',
      relationTo: 'partnerships',
      hasMany: false,
    }
  ],
};
