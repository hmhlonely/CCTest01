
import * as _fse from "fs-extra";
import { logger } from "./Logger";
import * as _jsonToLua from "json_to_lua";
import * as _path from "path";
//继承模块
export * from "fs-extra";

/**
 * 是否文件夹
 * @param src 路径
 */
export function isDir(src: string) {
    if (!_fse.pathExistsSync(src)) {
        logger.error("不存在的路径", src)
        return false;
    }
    if (_fse.statSync(src).isDirectory()) {
        return true;
    }
    return false;
}
/**
 * 获取文件夹内容
 * @param src 
 */
export function getDirList(src: string) {
    if (this.isDir(src)) {
        return _fse.readdirSync(src);
    }
    return [];
}
/**
 * 把obj转lua写入文件
 * @param src 文件路径
 * @param jsonData obj数据
 */
export function outputJsonToLuaSync(src: string, jsonData: object) {
    let keyIsInt = false;
    for (let key in jsonData) {
        if (key == "-1") {
            continue;
        }
        keyIsInt = jsonData[key]["id"].constructor == Number;
        break;
    }
    let content = _jsonToLua.jsObjectToLuaPretty(jsonData, 1, keyIsInt);
    content = `local t =${content}\nreturn t`;
    content = content.replace(/"__nil__"/g, "nil");
    content = content.replace(/"\""/g, "\\\"")
    _fse.outputFileSync(src, content);
}

/**
 * 规范化路径  //https://github.com/soates/Auto-Import/blob/v1.5.3/src/helpers/path-helper.ts
 * @param relativePath 相对路径
 * @returns 
 */
export function normalisePath(relativePath: string) {
    /** 删除扩展 */
    let removeFileExtenion = (rp: string) => {
        if (rp) {
            rp = rp.substring(0, rp.lastIndexOf('.'))
        }
        return rp;
    }
    /** 生成相对路径 */
    let makeRelativePath = (rp: string) => {
        let preAppend = './';
        if (!rp.startsWith(preAppend) && !rp.startsWith('../')) {
            rp = preAppend + rp;
        }
        if (/^win/.test(process.platform)) {
            rp = rp.replace(/\\/g, '/');
        }
        return rp;
    }
    relativePath = makeRelativePath(relativePath);
    relativePath = removeFileExtenion(relativePath);
    return relativePath;
}
/**
 * 获取相对路径 //https://github.com/soates/Auto-Import/blob/v1.5.3/src/helpers/path-helper.ts
 * @param currPath 当前路径
 * @param importPath 需要导入的路径
 * @returns 
 */
export function getRelativePath(currPath: string, importPath: string): string {
    let dir = _path.relative(_path.dirname(currPath), importPath);
    return normalisePath(dir);
}