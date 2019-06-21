// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

import { shallowMount } from '@vue/test-utils';
import ChangePasswordPopup from '@/components/account/ChangePasswordPopup.vue';
import Button from '@/components/common/Button.vue';
import * as sinon from 'sinon';

describe('ChangePasswordPopup.vue', () => {

    it('renders correctly', () => {

        const wrapper = shallowMount(ChangePasswordPopup);

        expect(wrapper).toMatchSnapshot();
    });

    it('triggered onCloseClick renders correctly', () => {
        let dispatchSpy = sinon.spy();

        const wrapper = shallowMount(ChangePasswordPopup);

        wrapper.vm.$emit('onCloseClick');
        wrapper.vm.$emit('cancel');

        expect(wrapper.emitted().onCloseClick).toBeTruthy();
        expect(wrapper.emitted().cancel).toBeTruthy();
    });

    it('triggered onCloseClick renders correctly', () => {
        let dispatchSpy = sinon.spy();

        const wrapper = shallowMount(ChangePasswordPopup, {
            mocks: {
                $store: {
                    dispatch: dispatchSpy
                }
            }
        });

        wrapper.find(Button).trigger('click');

        expect(dispatchSpy.callCount).toBe(1);
    });
});
