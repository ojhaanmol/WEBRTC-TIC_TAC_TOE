const app = require('./app');

const main = async(env,argv) => {
    const port = env.PORT || argv[2] || 3000;
    app.listen(port,()=>{
        console.log(`Application running on port: ${port}`);
    });
}

main(process.env,process.argv);