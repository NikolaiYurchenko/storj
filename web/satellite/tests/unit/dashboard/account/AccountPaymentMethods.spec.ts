// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

import { shallowMount } from '@vue/test-utils';
import AccountPaymentMethods from '@/components/account/AccountPaymentMethods.vue';

describe('AccountPaymentMethods.vue', () => {

    it('renders correctly', () => {

        const wrapper = shallowMount(AccountPaymentMethods);

        expect(wrapper).toMatchSnapshot();
    });
});
