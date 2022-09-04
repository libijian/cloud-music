import service from "..";
//获取歌单详情页数据7192540437
export function getMusicItemList(data){
       return service({
        method:"GET",
        url:`/playlist/detail?id=${data}`,
       })
}
export function getItemList(data){
       return service({
        method:"GET",
        url:`/playlist/track/all?id=${data}&limit=10&offset=1`,
       })
}
//获取歌词
export function getMusicLyric(data){
       return service({
        method:"GET",
        url:`/lyric?id=${data}`,
       })
}