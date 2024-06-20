import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { payloadCloud } from '@payloadcms/plugin-cloud';
import dotenv from 'dotenv';
import path from 'path';

// Import your existing collections
import Organisations from './collections/Organisations';
import Partnerships from './collections/Partnerships';
import Users from './collections/Users';
import BeforeDashboard from './components/BeforeDashboard';
import BeforeLogin from './components/BeforeLogin';
import Classifications from './collections/Classifications';
import Activities from './collections/Activities';
import Places from './collections/Places';
import Profiles from './collections/Profiles';
import Contacts from './collections/Contacts';
import Products from './collections/Products';
import CodeLists from './collections/CodeLists';
import Codes from './collections/Codes';
import Sessions from './collections/Sessions';
import Counters from './collections/Counters';
import Availabilities from './collections/Availabilities';
import WeekAvailabilities from './collections/WeekAvailabilities';
import SeasonAvailabilities from './collections/SeasonAvailabilities';
import Units from './collections/Units';
import Orders from './collections/Orders';
import Subscriptions from './collections/Subscriptions';
import Workspaces from './collections/Workspaces';
import Fulfilments from './collections/Fulfilments';
import Batches from './collections/Batches';
import KnowledgeBases from './collections/KnowledgeBases';
import KnowledgeElements from './collections/KnowledgeElements';
import Relationships from './collections/Relationships';
import Contributions from './collections/Contributions';
import Catalogs from './collections/Catalogs';
import CatalogItems from './collections/CatalogItems';
import Actions from './collections/Actions';
import InformationSystems from './collections/InformationSystems';
import References from './collections/References';
import Persons from './collections/Persons';
import Sectors from './collections/Sectors';
import ProductGroup from './collections/ProductGroup';


dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});



export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      beforeLogin: [BeforeLogin],
      beforeDashboard: [BeforeDashboard],
    },
    dateFormat: 'dd MMM yyyy hh:mm',
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          dotenv: path.resolve(__dirname, './dotenv.js')
        },
      },
    }),
  },
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [
    Organisations,
    Partnerships,
    Workspaces,
    Activities,
    Counters,
    Places,
    Persons,
    Orders,
    Subscriptions,
    Fulfilments,
    Products,
    Batches,
    Sessions,
    Catalogs,
    CatalogItems,
    Availabilities,
    WeekAvailabilities,
    SeasonAvailabilities,
    Relationships,
    Contributions,
    Profiles,
    Contacts,
    Actions,
    Categories,
    Classifications,
    Codes,
    CodeLists,
    Units,
    Media,
    KnowledgeBases,
    KnowledgeElements,
    InformationSystems,
    References,
    Users,
    Sectors,
    ProductGroup, 
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  i18n: {
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        custom: {},
        general: {
          noLabel: "",
        },
      },
      fr: {
        general: {
          noLabel: "",
        },
      },
    },
  },
  plugins: [
    payloadCloud(),
  ],
});
