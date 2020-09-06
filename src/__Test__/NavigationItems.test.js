import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from '../Components/Navigation/NavigationItems/NavigationItems';
import NavigationItem from '../Components/Navigation/NavigationItems/NavigationItem/NavigationItem';

configure({ adapter: new Adapter() })

describe('Check <NavigationItems/>', () => {
    let warpper;
    beforeEach(() => {
        warpper = shallow(<NavigationItems />)
    })
    it('Should be 2 <NavigationItem/> if not Auth', () => {

        expect(warpper.find(NavigationItem)).toHaveLength(2)
    });
    it('Should be 3 <NavigationItem/> if not Auth', () => {
        // warpper = shallow(<NavigationItems isAuth />)
        warpper.setProps({ isAuth: true });
        expect(warpper.find(NavigationItem)).toHaveLength(3)
    });
});
