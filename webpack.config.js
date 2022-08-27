module.exports={
   
    module: {
     
        rules:[
            {
              test: /\.(js|jsx)$/,
              exclude:/node_modules/,
              use:{
                  loader:"babel-loader"
              }
            },

            {
               test:/\.(jpg|jpeg|png|svg|ttf)$/,
               use:{
                   loader:"file-loader"
               }
            }
   

          
        ],
      
    },
 
    
}