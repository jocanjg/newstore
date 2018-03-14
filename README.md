# Newstore

Info about setting up workspace : 

1. Install node

        http://nodesource.com/blog/installing-nodejs-tutorial-mac-os-x/
        
2. Install gulp

        npm install gulp-cli -g
        npm install gulp -D
        
3. Install gulp-compass

        npm install -g gulp-compass

4. Install gulp-sass

        npm install -g gulp-sass
        
5. Install post css
       
        npm install -g postcss
    
6. Install autoprefixer
        
        npm install -g autoprefixer-core

7. Install csswring
        
        npm install -g csswring
 
8. Install gulp-sourcemaps
        
        npm install gulp-sourcempas
        
        P.S. ==> this should be runn from root of the folder to update current node-modules...!!!!



YOU CAN BUILD APP WITH FOLLOWING COMMAND

        gulp build
        
YOU CAN WATCH LOCAL CHANGES TO YOUR LOCAL PROJECT WITH COMMAND 

        gulp compass
        (this should be used when trying to compile scss to css not build because this command only overwrite dev-css
               and that is what we need, prod-css is only for production use not development)
        
