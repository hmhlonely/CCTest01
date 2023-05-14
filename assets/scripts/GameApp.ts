import { AssetManager, assetManager, Component, director, game, instantiate, macro, Prefab, _decorator } from 'cc';
import * as fgui from "fairygui-cc";
import * as BlendMode from "fairygui-cc/display/BlendMode";
import { UIUtils } from './base/utils/UIUtils';
import { UIBaseBinder } from './src/base/UIBaseBinder';
import { UIGameThreeBinder } from './src/gameThree/UIGameThreeBinder';
import { UIGameThreeHome } from './src/gameThree/view/UIGameThreeHome';
const { ccclass, property } = _decorator;
@ccclass('GameApp')
export class GameApp extends Component {
    onLoad() {
        assetManager.loadBundle("res", (err, data: AssetManager.Bundle) => {
            if (err) {
                console.log("load bundle erro: ", err);
                return;
            }
            UIUtils.bundle = data;

        });

        // bound.load("login/Login", Prefab, (err, data) => {
        //     var uiView = instantiate(data);
        //     this.node.addChild(uiView);

        //     // uiView.addComponent(UILogin);
        // })


        new UIGameThreeBinder();
        new UIBaseBinder();
        fgui.GRoot.create();
        let root = fgui.GRoot.inst;
        director.addPersistRootNode(root.node);
        root.node.setSiblingIndex(2);
        // BlendMode.BlendModeUtils.override(fgui.BlendMode.Custom1,);

        fgui.UIPackage.loadPackage("fgui/@pub", (err, pkg) => {
            fgui.UIPackage.loadPackage("fgui/base", (err, pkg) => {
                UIUtils.show(UIGameThreeHome);
            });
        });
    }
}
