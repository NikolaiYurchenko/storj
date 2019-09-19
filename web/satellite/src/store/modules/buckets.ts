// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

import { createModule, mutation, action, extractVuexModule } from "vuex-class-component";
import { Bucket, BucketCursor, BucketPage, BucketsApi } from '@/types/buckets';

export const BUCKET_ACTIONS = {
    FETCH: 'setBuckets',
    SET_SEARCH: 'setBucketSearch',
    CLEAR: 'clearBuckets',
};

export const BUCKET_MUTATIONS = {
    SET: 'setBuckets',
    SET_SEARCH: 'setBucketSearch',
    SET_PAGE: 'setBucketPage',
    CLEAR: 'clearBuckets',
};
const bucketPageLimit = 7;
const firstPage = 1;

class BucketsState {
    public cursor: BucketCursor = { limit: bucketPageLimit, search: '', page: firstPage };
    public page: BucketPage = { buckets: new Array<Bucket>(), currentPage: 1, pageCount: 1, offset: 0, limit: bucketPageLimit, search: '', totalCount: 0 };
}

const VuexModule = createModule({
    namespaced: true,
    strict: false,
    target: "nuxt",
    enableLocalWatchers: false
});

export class BucketsModule extends VuexModule {
    public cursor1: BucketCursor = { limit: bucketPageLimit, search: '', page: firstPage };
    public page1: BucketPage = { buckets: new Array<Bucket>(), currentPage: 1, pageCount: 1, offset: 0, limit: bucketPageLimit, search: '', totalCount: 0 };
    public $store: any;

    constructor(private api: BucketsApi) {
        super();
    }

    @mutation setBuckets1(page: BucketPage) {
        this.page1 = page;
    }

    @mutation setBucketPage(page: number) {
        this.cursor1.page = page;
    }

    @mutation setBucketSearch(search: string) {
        this.cursor1.search = search;
    }

    @mutation clearBuckets() {
        this.cursor1 = new BucketCursor('', bucketPageLimit, firstPage);
        this.page1 = new BucketPage([], '', bucketPageLimit, 0, 1, 1, 0);
    }

    @action async setBuckets(page: number): Promise<BucketPage> {
        const projectID = 'rootGetters.selectedProject.id';
        const before = new Date();
        this.setBucketPage(page);

        const result = await this.api.get(projectID, before, this.cursor);

        this.setBuckets1(result);

        return result;
    }

    get page(): BucketPage {
        return this.page1;
    }
    get cursor (): BucketCursor {
        return this.cursor1;
    }
}

// import { StoreModule } from '@/store';
// import { Bucket, BucketCursor, BucketPage, BucketsApi } from '@/types/buckets';
//
// export const BUCKET_ACTIONS = {
//     FETCH: 'setBuckets',
//     SET_SEARCH: 'setBucketSearch',
//     CLEAR: 'clearBuckets',
// };
//
// export const BUCKET_MUTATIONS = {
//     SET: 'setBuckets',
//     SET_SEARCH: 'setBucketSearch',
//     SET_PAGE: 'setBucketPage',
//     CLEAR: 'clearBuckets',
// };
//
// const {
//     FETCH,
// } = BUCKET_ACTIONS;
// const {
//     SET,
//     SET_PAGE,
//     SET_SEARCH,
//     CLEAR,
// } = BUCKET_MUTATIONS;
// const bucketPageLimit = 7;
// const firstPage = 1;
//
// class BucketsState {
//     public cursor: BucketCursor = { limit: bucketPageLimit, search: '', page: firstPage };
//     public page: BucketPage = { buckets: new Array<Bucket>(), currentPage: 1, pageCount: 1, offset: 0, limit: bucketPageLimit, search: '', totalCount: 0 };
// }
//
// /**
//  * creates buckets module with all dependencies
//  *
//  * @param api - buckets api
//  */
// export function makeBucketsModule(api: BucketsApi): StoreModule<BucketsState> {
//     return {
//         state: new BucketsState(),
//
//         mutations: {
//             [SET](state: BucketsState, page: BucketPage) {
//                 state.page = page;
//             },
//             [SET_PAGE](state: BucketsState, page: number) {
//                 state.cursor.page = page;
//             },
//             [SET_SEARCH](state: BucketsState, search: string) {
//                 state.cursor.search = search;
//             },
//             [CLEAR](state: BucketsState) {
//                 state.cursor = new BucketCursor('', bucketPageLimit, firstPage);
//                 state.page = new BucketPage([], '', bucketPageLimit, 0, 1, 1, 0);
//             },
//         },
//         actions: {
//             [FETCH]: async function({commit, rootGetters, state}: any, page: number): Promise<BucketPage> {
//                 const projectID = rootGetters.selectedProject.id;
//                 const before = new Date();
//                 state.cursor.page = page;
//
//                 commit(SET_PAGE, page);
//
//                 const result = await api.get(projectID, before, state.cursor);
//
//                 commit(SET, result);
//
//                 return result;
//             },
//             [BUCKET_ACTIONS.SET_SEARCH]: function({commit}, search: string) {
//                 commit(SET_SEARCH, search);
//             },
//             [BUCKET_ACTIONS.CLEAR]: function({commit}) {
//                 commit(CLEAR);
//             },
//         },
//         getters: {
//             page: (state: BucketsState): BucketPage => state.page,
//             cursor: (state: BucketsState): BucketCursor => state.cursor,
//         },
//     };
// }
