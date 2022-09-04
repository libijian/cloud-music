import service from "..";
//获取首页轮播图
export function getBanner(){
       return service({
        method:"GET",
        url:"/banner?type=2",
       })
}
//获取发现好歌单
export function getMusicList(){
    return service({
     method:"GET",
     url:"/personalized?limit=10",
    })
}
//搜索/search?keywords=海阔天空
export function getSearchMusic(data){
    return service({
     method:"GET",
     url:`/search?keywords=${data}`,
    })
}
//登录login/login/cellphone?phone=xxx&password=yyy
export function getCaptcha(data){
    return service({
     method:"GET",
     url:`/captcha/sent?phone=${data.phone}`,
    })
}

export function getLogin(data){
    return service({
     method:"GET",
     url:`/captcha/verify?phone=${data.phone}&captcha=${data.captcha}`,
    })
}
//id=502807435
export function getuser(data){
    return service({
        method:"GET",
        url:"/user/detail?uid=502807435"
    })
}

export function getRecommend(){
    return service({
     method:"GET",
     url:`/recommend/songs`,
    })
}
