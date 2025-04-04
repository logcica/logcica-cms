// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import Categories from './collections/Categories'
import { Media } from './collections/Media'
import Users from './collections/Users'
import Classifications from './collections/Classifications'
import Organisations from './collections/Organisations'
import Recipes from './collections/Recipes'
import Activities from './collections/Activities'
import Partnerships from './collections/Partnerships'
import Places from './collections/Places'
import Profiles from './collections/Profiles'
import Contacts from './collections/Contacts'
import Products from './collections/Products'
import CodeLists from './collections/CodeLists'
import Codes from './collections/Codes'
import Sessions from './collections/Sessions'
import Counters from './collections/Counters'
import Availabilities from './collections/Availabilities'
import WeekAvailabilities from './collections/WeekAvailabilities'
import SeasonAvailabilities from './collections/SeasonAvailabilities'
import Units from './collections/Units'
import Orders from './collections/Orders'
import Subscriptions from './collections/Subscriptions'
import Workspaces from './collections/Workspaces'
import Fulfilments from './collections/Fulfilments'
import Batches from './collections/Batches'
import KnowledgeBases from './collections/KnowledgeBases'
import KnowledgeElements from './collections/KnowledgeElements'
import Relationships from './collections/Relationships'
import Contributions from './collections/Contributions'
import Catalogs from './collections/Catalogs'
import CatalogItems from './collections/CatalogItems'
import Actions from './collections/Actions'
import InformationSystems from './collections/InformationSystems'
import References from './collections/References'
import Persons from './collections/Persons'
import Sectors from './collections/Sectors'
import ProductGroup from './collections/ProductGroup'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: 'dd MMM yyyy hh:mm',
  },
  collections: [
    Sectors,
    Partnerships,
    Organisations,
    Activities,
    Workspaces,
    Counters,
    Places,
    Persons,
    Contributions,
    Relationships,
    Profiles,
    Contacts,
    Actions,
    Orders,
    Subscriptions,
    Fulfilments,
    Products,
    ProductGroup,
    Recipes,
    Batches,
    Sessions,
    Catalogs,
    CatalogItems,
    Availabilities,
    WeekAvailabilities,
    SeasonAvailabilities,
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
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en, fr },
  },
  /*
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  */
  /* TODO review if I need this
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  */
  /* TODO
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  */
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true, // can have a prefix
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})

/*

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'
import Categories from './collections/Categories'
import { Media } from './collections/Media'
import Users from './collections/Users'
import BeforeDashboard from './components/BeforeDashboard'
import BeforeLogin from './components/BeforeLogin'
import Classifications from './collections/Classifications'
import Organisations from './collections/Organisations'
import Recipes from './collections/Recipes'
import Activities from './collections/Activities'
import Partnerships from './collections/Partnerships'
import Places from './collections/Places'
import Profiles from './collections/Profiles'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import Contacts from './collections/Contacts'
import Products from './collections/Products'
import CodeLists from './collections/CodeLists'
import Codes from './collections/Codes'
import Sessions from './collections/Sessions'
import Counters from './collections/Counters'
import Availabilities from './collections/Availabilities'
import WeekAvailabilities from './collections/WeekAvailabilities'
import SeasonAvailabilities from './collections/SeasonAvailabilities'
import Units from './collections/Units'
import Orders from './collections/Orders'
import Subscriptions from './collections/Subscriptions'
import Workspaces from './collections/Workspaces'
import Fulfilments from './collections/Fulfilments'
import Batches from './collections/Batches'
import KnowledgeBases from './collections/KnowledgeBases'
import KnowledgeElements from './collections/KnowledgeElements'
import Relationships from './collections/Relationships'
import Contributions from './collections/Contributions'
import Catalogs from './collections/Catalogs'
import CatalogItems from './collections/CatalogItems'
import Actions from './collections/Actions'
import InformationSystems from './collections/InformationSystems'
import References from './collections/References'
import Persons from './collections/Persons'
import Sectors from './collections/Sectors'
import ProductGroup from './collections/ProductGroup'

const generateTitle: GenerateTitle = () => {
  return 'My Website'
}

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

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
          dotenv: path.resolve(__dirname, './dotenv.js'),
        },
      },
    }),
  },
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  rateLimit: {
    max: 2000,
  },
  collections: [
    Sectors,
    Partnerships,
    Organisations,
    Activities,
    Workspaces,
    Counters,
    Places,
    Persons,
    Contributions,
    Relationships,
    Profiles,
    Contacts,
    Actions,
    Orders,
    Subscriptions,
    Fulfilments,
    Products,
    ProductGroup,
    Recipes,
    Batches,
    Sessions,
    Catalogs,
    CatalogItems,
    Availabilities,
    WeekAvailabilities,
    SeasonAvailabilities,
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
    fallbackLng: 'en', // default
    debug: false, // default
    resources: {
      en: {
        custom: {
          // key1: 'Translation with {{variable}}',
        },
        general: {
          noLabel: '',
        },
      },
      fr: {
        general: {
          noLabel: '',
        },
      },
    },
  },
  plugins: [
    //relationshipsAsObjectID(),
    payloadCloud(),

  ],
})

*/
