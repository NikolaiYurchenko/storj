// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

import { shallowMount } from '@vue/test-utils';
import TabNavigation from '@/components/navigation/TabNavigation.vue';
import * as sinon from 'sinon';

const testRoutes = [
    {
        path: '/test1',
        name: 'Test1'
    },
    {
        path: '/test2',
        name: 'Test2'
    },
    {
        path: '/test3',
        name: 'Test3'
    },
    {
        path: '/test4',
        name: 'Test4'
    },
];

describe('TabNavigation.vue', () => {
    it('renders correctly', () => {
        const wrapper = shallowMount(TabNavigation);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with navigation prop', () => {
        const wrapper = shallowMount(TabNavigation, {
            propsData: {navigation: testRoutes},
            stubs: ['router-link']
        });

        let wrapperArray = wrapper.findAll('.tab-navigation-container__item');

        for (let i = 0; i < wrapperArray.length; i++) {
            expect(wrapperArray.at(i).attributes().to).toBe(testRoutes[i].path);
        }
    });
});
