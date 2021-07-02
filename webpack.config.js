// import
// Node.js 환경에서 언제든지 가지고 와서 사용할 수 있는
// path라는 전역 모듈을 가지고 와서
// path라는 변수에 할당한다
const path = require('path')

// require이라는 함수를 통해서 노드 모둘스에서
// 'html-webpack-plugin' 팩키지를 가지고 
// 와서 해당 변수에 할당함
const HtmlPlugin = require('html-webpack-plugin')

// 이미지 파일 webpack에 사용하기 위한 플러그인
const CopyPlugin = require('copy-webpack-plugin')

// export
module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // path라는 변수에 resolve라는 메소드를 사용
    // resolve는 첫 번째 인수와 두 번째 인수의 
    // 경로를 합쳐주는 역할을 함
    // '__dirname'는 현제 파일이 있는 경로
    // webpack.config.js라는 파일이 있는 경로 
    // 두 인자의 경로를 합쳐서 절대적인 경로를
    // output의 path에 제공할 수 있음

    // 아래 두줄 내용은 기본 설정으로 되니 작성안해도 됨
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    clean: true
    // 지금 설정해둔 'main.js'파일 이외에는 제거함
  },

  module: {
    rules: [
      {
        // test: /\.css$/, // '.css'로 끝나는 것을 찾는 정규식
        test: /\.s?css$/, // s라는 단어가 있을 수도 있고 없을 수도 있다는 정규식
        use: [ // 설치한 프러그인의 이름 명시, 순서도 중요함
          'style-loader', // 아래에서 해석 된 내용을 html의 스타일 태그 부분에 삽입해주는 역할
          'css-loader', // 먼저 해석됨, js에서 css파일을 해석하는 용도로 해당 패키지를 사용
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [ // plugins 라는 구성 옵션을 추가하고 배열 데이터를 할당함
    new HtmlPlugin({ //new라는 키워드로 HtmlPlugin을 생성자 함수처럼 실행함
      template: './index.html'
      // 루트경로에 만들어 둔 index.html 파일
    }),
    new CopyPlugin({
      patterns: [ // 어디서 부터 해당하는 내용을 복사해서 'dist'라는 폴더로 집어 넣을 것인지 명시함
        { from: 'static' }
      ]
    })
  ],

  devServer: {
    host: 'localhost'
  }
}

// webpack이 프로젝트의 어디로 진입 해야 하는지 설정 해주고
// 처리가 완료 되면 결과물을 어디에다가 내어주어야 하는지
// entry와 output이라는 옵션으로 설정할 수 있음