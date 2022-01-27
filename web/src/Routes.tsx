import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Checkout } from "./modules/account/Checkout";
import { FulfillPayment } from "./modules/account/FulfillPayment";
import { MeView } from "./modules/user/MeView";
import { FullRegisterView } from './modules/user/FullRegisterView';
import { AppNavbar } from "./modules/nav/AppNavbar";
import { LoginAndRegister } from './modules/user/LoginAndRegister';
import { Promo } from "./modules/promo/Promo";
import { TestConsole } from "./modules/curriculum/TestConsole";
import { Exercise } from "./modules/curriculum/Exercise";
import { TileDisplay } from "./modules/curriculum/TileDisplay";

export class Routes extends React.PureComponent {
    render() {
        return (
            <BrowserRouter basename="/">
                <Route render={({location}) => (!location.pathname.includes("code/exercise")) ? <AppNavbar title="Online Curriculum Project" showLogo/> : null}>
                </Route>
                <Switch>
                    
                    <Route path="/login" component={LoginAndRegister}/>
                    <Route path="/register" component={FullRegisterView}/>
                    <Route path="/me" component={MeView}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/fulfillpayment" component={FulfillPayment}/>
                    <Route path="/code">
                        <TileDisplay/>
                    </Route>
                    <Route path="/" component={Promo}/>
                </Switch>
            </BrowserRouter>
        )
    }
}