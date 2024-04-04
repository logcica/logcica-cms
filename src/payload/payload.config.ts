import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import seo from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'

import Categories from './collections/Categories'
import Comments from './collections/Comments'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import Users from './collections/Users'
import BeforeDashboard from './components/BeforeDashboard'
import BeforeLogin from './components/BeforeLogin'
import { seed } from './endpoints/seed'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
import Classifications from './collections/Classifications'
import Organisations from './collections/Organisations'
import Activities from './collections/Activities'
import Partnerships from './collections/Partnerships'
import Places from './collections/Places'
import Profiles from './collections/Profiles'
import {
  HTMLConverterFeature,
  LexicalPluginToLexicalFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import Contacts from './collections/Contacts'
import Products from './collections/Products'
import { relationshipsAsObjectID } from './plugins/relationshipObjectIds'
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

const generateTitle: GenerateTitle = () => {
  return 'My Website'
}

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: [BeforeLogin],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
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
          [path.resolve(__dirname, './endpoints/seed')]: path.resolve(
            __dirname,
            './emptyModuleMock.js',
          ),
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
    Contributions,
    Orders,
    Subscriptions,
    Fulfilments,
    Products,
    Batches,
    Sessions,
    Catalogs,
    CatalogItems,
    Contacts,
    Relationships,
    Availabilities,
    WeekAvailabilities,
    SeasonAvailabilities,
    Categories,
    Classifications,
    Codes,
    CodeLists,
    Units,
    Media,
    Profiles,
    KnowledgeBases,
    KnowledgeElements,
    Users,
    Pages,
    Posts,
    Projects
  ],
  /*
  globals: [Settings, Header, Footer],
  */
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  endpoints: [
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    {
      path: '/seed',
      method: 'get',
      handler: seed,
    },
  ],
  i18n: {
    fallbackLng: 'en', // default
    debug: false, // default
    resources: {
      en: {
        custom: {
          // key1: 'Translation with {{variable}}',
        },
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
    /*
    nestedDocs({
      collections: ['sessions'],
      generateLabel: (_, doc: any) => doc.title,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    redirects({
      collections: ['pages', 'posts'],
    }),
    seo({
      collections: ['pages', 'posts', 'projects'],
      generateTitle,
      uploadsCollection: 'media',
    }),
    */
    //relationshipsAsObjectID(),
    payloadCloud(),
    /*cloudStorage({
      collections: {
        // Enable cloud storage for Media collection
        media: {
          // Create the S3 adapter
          adapter: s3Adapter({
            config: {
              endpoint: process.env.S3_ENDPOINT,
              region: 'us-east-1',
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
              },
            },
            bucket: process.env.S3_BUCKET,
          }),
        },
      },
    }),*/
  ],
})
