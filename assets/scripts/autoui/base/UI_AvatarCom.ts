/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_AvatarCom extends fgui.GComponent {

	public ctrl_hide:fgui.Controller;
	public img_shadow:fgui.GImage;
	public test:fgui.GLoader;

	public static URL:string = "ui://0463csswknc3m";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_AvatarCom";

	public static createInstance():UI_AvatarCom {
		return <UI_AvatarCom>(fgui.UIPackage.createObject("base","AvatarCom"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_hide = self.getController("ctrl_hide");
		self.img_shadow = <fgui.GImage>(self.getChild("img_shadow"));
		self.test = <fgui.GLoader>(self.getChild("test"));
		super.onConstruct();
	}
}