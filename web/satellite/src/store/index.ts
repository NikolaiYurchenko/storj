// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

import Vue from 'vue';
import Vuex from 'vuex';
import { extractVuexModule } from "vuex-class-component";

import { ApiKeysApiGql } from '@/api/apiKeys';
import { BucketsApiGql } from '@/api/buckets';
import { CreditsApiGql } from '@/api/credits';
import { ProjectMembersApiGql } from '@/api/projectMembers';
import { ProjectsApiGql } from '@/api/projects';
import { ProjectUsageApiGql } from '@/api/usage';
import { UsersApiGql } from '@/api/users';
import { makeApiKeysModule } from '@/store/modules/apiKeys';
import { appStateModule } from '@/store/modules/appState';
import { BucketsModule } from '@/store/modules/buckets';
import { makeCreditsModule } from '@/store/modules/credits';
import { makeNotificationsModule } from '@/store/modules/notifications';
import { projectPaymentsMethodsModule } from '@/store/modules/paymentMethods';
import { makeProjectMembersModule } from '@/store/modules/projectMembers';
import { makeProjectsModule } from '@/store/modules/projects';
import { makeUsageModule } from '@/store/modules/usage';
import { makeUsersModule } from '@/store/modules/users';
import {createProxy, VuexModule} from 'vuex-class-component/js';

Vue.use(Vuex);

export class StoreModule<S> {
    public state: S;
    public mutations: any;
    public actions: any;
    public getters?: any;
}

// TODO: remove it after we will use modules as classes and use some DI framework
const usersApi = new UsersApiGql();
const apiKeysApi = new ApiKeysApiGql();
const creditsApi = new CreditsApiGql();
const bucketsApi = new BucketsApiGql();
const projectMembersApi = new ProjectMembersApiGql();
const projectsApi = new ProjectsApiGql();
const projectUsageApi = new ProjectUsageApiGql();

// Satellite store (vuex)
const store = new Vuex.Store({
    modules: {
        notificationsModule: makeNotificationsModule(),
        apiKeysModule: makeApiKeysModule(apiKeysApi),
        appStateModule,
        creditsModule: makeCreditsModule(creditsApi),
        projectMembersModule: makeProjectMembersModule(projectMembersApi),
        projectPaymentsMethodsModule,
        usersModule: makeUsersModule(usersApi),
        projectsModule: makeProjectsModule(projectsApi),
        usageModule: makeUsageModule(projectUsageApi),
        ...extractVuexModule(new BucketsModule(bucketsApi)),
        // bucketUsageModule: makeBucketsModule(bucketsApi),
    },
});

const vxm = {
    user: createProxy( new BucketsModule(bucketsApi) ),
}

export default store;
