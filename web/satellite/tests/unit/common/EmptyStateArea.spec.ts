// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

import { mount, shallowMount } from '@vue/test-utils';
import EmptyStateArea from '@/components/common/EmptyStateArea.vue';
import * as sinon from 'sinon';

describe('EmptyStateArea.vue', () => {

    it('renders correctly', () => {

        const wrapper = shallowMount(EmptyStateArea);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly without button props', () => {
        let mainTitle = 'testMainTitle';
        let additionalTextTag = '<h2>testAdditionalText</h2>';
        let additionalText = 'testAdditionalText';

        const wrapper = shallowMount(EmptyStateArea, {
            propsData: {mainTitle, additionalText: additionalTextTag},
        });

        let wrapperAdditionalTextTag = wrapper.find('h2');
        let wrapperMainTitleTag = wrapper.find('h1');

        expect(wrapperAdditionalTextTag.text()).toBe(additionalText);
        expect(wrapperMainTitleTag.text()).toBe(mainTitle);
    });

    it('renders correctly with isButtonShown prop', () => {
        let buttonLabel = 'testButtonLabel';

        const wrapper = shallowMount(EmptyStateArea, {
            propsData: {isButtonShown: true, buttonLabel, },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('trigger on press correctly with onButtonClick prop', () => {
        let onButtonClickSpy = sinon.spy();

        const wrapper = mount(EmptyStateArea, {
            propsData: {isButtonShown: true, onButtonClick: onButtonClickSpy},
        });

        wrapper.find('div.container').trigger('click');

        expect(onButtonClickSpy.callCount).toBe(1);
    });
});
