export const getUser = () => {
  const user = JSON.parse(localStorage.getItem(`9asset.userinfo`) || '{}',);
  if(user?.id){
    return user;    
  }
  return null;
}

export const getUserSync = () => {
  return new Promise<any|null>((resolve) => {
    const user = JSON.parse(localStorage.getItem(`9asset.userinfo`) || 'null');
    if(user?.id){
        return resolve(user);    
    }

    let cnt = 0;
    const looper = setInterval(() => {
        const user = JSON.parse(localStorage.getItem(`9asset.userinfo`) || 'null');
        console.log(user);
        if(user?.id){
            clearInterval(looper);
            return resolve(user);    
        }

        cnt++;
        if (cnt > 50) {
            clearInterval(looper);
            return resolve(null);
        }
    }, 1000);
  })
}