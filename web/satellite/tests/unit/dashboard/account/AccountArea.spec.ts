// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

import { mount, shallowMount } from '@vue/test-utils';
import AccountArea from '@/components/account/AccountArea.vue';
import * as sinon from 'sinon';

describe('AccountArea.vue', () => {
    it('renders correctly', () => {

        const wrapper = shallowMount(AccountArea, {
            mocks: {
                $router: {
                    push: () => {}
                }
            },
            stubs: ['router-view', 'router-link']
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('trigger redirection on mounted correctly', () => {
        let routerSpy = sinon.spy();

        const wrapper = mount(AccountArea, {
            mocks: {
                $router: {
                    push: routerSpy
                }
            },
            stubs: ['router-view', 'router-link']
        });

        expect(routerSpy.callCount).toBe(1);
    });
});
