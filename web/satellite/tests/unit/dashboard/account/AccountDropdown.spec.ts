// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

import { mount, shallowMount } from '@vue/test-utils';
import AccountDropdown from '@/components/header/AccountDropdown.vue';
import * as sinon from 'sinon';

describe('AccountDropdown.vue', () => {
    it('renders correctly', () => {

        const wrapper = shallowMount(AccountDropdown);

        expect(wrapper).toMatchSnapshot();
    });

    it('trigger onAccountSettingsClick correctly', () => {
        let routerSpy = sinon.spy();
        let dispatchSpy = sinon.spy();

        const wrapper = mount(AccountDropdown, {
            mocks: {
                $router: {
                    push: routerSpy
                },
                $store: {
                    dispatch: dispatchSpy
                }
            }
        });

        wrapper.find('.account-dropdown-item-container.settings').trigger('click');

        expect(routerSpy.callCount).toBe(1);
        expect(dispatchSpy.callCount).toBe(1);
    });

    it('trigger onLogoutClick correctly', () => {
        let routerSpy = sinon.spy();
        let dispatchSpy = sinon.spy();

        const wrapper = mount(AccountDropdown, {
            mocks: {
                $router: {
                    push: routerSpy
                },
                $store: {
                    dispatch: dispatchSpy
                }
            }
        });

        wrapper.find('.account-dropdown-item-container.logout').trigger('click');

        expect(routerSpy.callCount).toBe(1);
        expect(dispatchSpy.callCount).toBe(5);
    });
});
