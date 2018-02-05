module.exports = {
  entry: ["./js/app.js", './js/particle.js' ],
  output: {
    filename:"out.js"
  },
  watch: true, devServer:{
    port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
