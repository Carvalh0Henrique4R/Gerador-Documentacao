/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'projects.index': {
    methods: ["GET","HEAD"],
    pattern: '/projects',
    tokens: [{"old":"/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['projects.index']['types'],
  },
  'projects.create': {
    methods: ["GET","HEAD"],
    pattern: '/projects/create',
    tokens: [{"old":"/projects/create","type":0,"val":"projects","end":""},{"old":"/projects/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['projects.create']['types'],
  },
  'projects.store': {
    methods: ["POST"],
    pattern: '/projects',
    tokens: [{"old":"/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['projects.store']['types'],
  },
  'projects.llm_settings': {
    methods: ["GET","HEAD"],
    pattern: '/projects/:id/settings/llm',
    tokens: [{"old":"/projects/:id/settings/llm","type":0,"val":"projects","end":""},{"old":"/projects/:id/settings/llm","type":1,"val":"id","end":""},{"old":"/projects/:id/settings/llm","type":0,"val":"settings","end":""},{"old":"/projects/:id/settings/llm","type":0,"val":"llm","end":""}],
    types: placeholder as Registry['projects.llm_settings']['types'],
  },
  'projects.llm_settings.save': {
    methods: ["POST"],
    pattern: '/projects/:id/settings/llm',
    tokens: [{"old":"/projects/:id/settings/llm","type":0,"val":"projects","end":""},{"old":"/projects/:id/settings/llm","type":1,"val":"id","end":""},{"old":"/projects/:id/settings/llm","type":0,"val":"settings","end":""},{"old":"/projects/:id/settings/llm","type":0,"val":"llm","end":""}],
    types: placeholder as Registry['projects.llm_settings.save']['types'],
  },
  'projects.documentation': {
    methods: ["GET","HEAD"],
    pattern: '/projects/:id/documentation',
    tokens: [{"old":"/projects/:id/documentation","type":0,"val":"projects","end":""},{"old":"/projects/:id/documentation","type":1,"val":"id","end":""},{"old":"/projects/:id/documentation","type":0,"val":"documentation","end":""}],
    types: placeholder as Registry['projects.documentation']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
