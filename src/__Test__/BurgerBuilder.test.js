import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from '../Containers/BurgerBuilder/BurgerBuilder';
import BuildControls from '../Components/Burger/BuildControls/BuildControls';

configure({adapter:new Adapter()});

describe('Check <BurgerBuilder /> phai them export truoc class', () => {
    let warrper;
    beforeEach(()=>{
        warrper = shallow(<BurgerBuilder setInitIngredient={()=> {}}/>)
    })
    it('Have to render Burger Controll if have ingredients', () => {
        warrper.setProps({ingredients: {salad:0}});
        expect(warrper.find(BuildControls)).toHaveLength(1)
    });
    
});
