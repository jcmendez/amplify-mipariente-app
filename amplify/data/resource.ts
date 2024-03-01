import {type ClientSchema, a, defineData} from '@aws-amplify/backend';

const schema = a.schema({
  Location: a.customType({
    lat: a.float(),
    long: a.float()
  }),

  Pariente: a.model({
    firstName: a.string().required(),
    lastName: a.string().required(),
    careTeam: a.hasOne('CareTeam'),
    tags: a.hasMany('TrackingTag')
  }).authorization([
    a.allow.owner(),
    a.allow.public().to(['read'])
  ]),

  CareTeam: a.model({
    pariente: a.belongsTo('Pariente'),
    members: a.manyToMany('Member', {relationName: 'TeamMembership'}),
    actions: a.hasMany('ActionItem'),
  }).authorization([
    a.allow.owner(),
    a.allow.public().to(['read'])
  ]),

  ActionItem: a.model({
    careTeam: a.belongsTo('CareTeam'),
    description: a.string(),
    dueDate: a.datetime(),
    doneDate: a.datetime(),
    done: a.boolean()
  }).authorization([
    a.allow.owner(),
    a.allow.public().to(['read'])
  ]),

  TrackingTag: a.model({
    uuid: a.string(),
    scans: a.hasMany('Scan'),
  }).authorization([
    a.allow.owner(),
    a.allow.public().to(['read'])
  ]),

  Scan: a.model({
    tag: a.hasOne('TrackingTag'),
    time: a.datetime(),
    location: a.ref('Location'),
  }).authorization([
    a.allow.owner(),
    a.allow.public().to(['read'])
  ]),

  Member: a.model({
    firstName: a.string().required(),
    lastName: a.string().required(),
    teams: a.manyToMany('CareTeam', {relationName: 'TeamMembership'})
  }).authorization([
    a.allow.owner(),
    a.allow.public().to(['read'])
  ])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema, authorizationModes: {
    defaultAuthorizationMode: 'apiKey', // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
