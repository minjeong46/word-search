# 기획
- 페이지
    1. word search marker 페이지
    2. list 페이지
    3. play 페이지

- word search marker 페이지
    1. title, description 과 10개 이상의 단어를 필수 입력
    2. 성공적으로 만들었으면 링크 생성

- list 페이지
    1. 현재까지 만들어진 게임 리스트

- play 페이지
    1. 접속 시 start 를 누르면 시작
    2. 시작 시 게임 진행 시간 표시 
    3. 좌측에 단어 리스트 -> 찾으면 찾은 단어 표시
    4. 우측에 현황판, 유저들의 현재 점수와 소요 시간 (1~3위 강조)
    5. 상단에 타이머, 제목, 설명
    6. 메인은 n x n , 영어 글자가 랜덤 배치로 등록한 단어가 중간에 섞여 있다.
    7. 알파벳을 연결해 맞으면 표시, 연결된 단어가 아니거나 없는 단어를 클릭 시 틀렸다는 표시

- 프론트 필수 요구 사항
    1. SPA 로 동작, 라우팅 라이브러리 사용 가능
    2. 파이어베이스 백엔드 연동, RealtimeDB 를 활용해 게임 제작 및 현황판 구현(현황판 실시간)
    3. CSS 활용하여 변수를 이용하여 컬러값 지정하고 CSS 프레임워크는 자유롭게 사용, CSS 는 모듈화로 나눌 것

# 사용할 기술 스택
- React
- React-router-dom
- JavaScript
- firebase
- HTML
- CSS (CSS 프레임워크를 사용하지 않고 모듈화만)


# 개발정보
## 7/14(일)
- React 세팅
- Header, Maker 페이지 구현
- Maker 페이지에서 데이터 입력 후 FireBase RealtimeDB 로 DB 에 저장되도록 구현

## 7/15(월)
- Maker 페이지 디자인
- React-router-dom 라이브러리를 사용하여 라우팅을 구현 (Maker 페이지와 Main 페이지만 path)

## 7/22(화)
- Play 페이지
  DB에서 createdAt 을 이용해 path 를 이용해 링크 생성하였지만, createdAt이 아닌 DB 시 생성되는 key 을 이용해 id 필드 생성으로 변경 -> 해당 게임을 가져올 때 key 값이 필요
  /items/id(or key) 값으로 라우팅해주고 useParams() 로 값을 가져오고 DB 에서 해당 id 값을 이용해 읽어와 data 를 item State 에 넣어둔다.

  영어 단어가 입력될 박스 구현
## 8/4(월)
- Play 페이지 word 값 배치
  random 으로 12*14 2차원 배열에 word 를 넣어주고 랜덤한 소문자를 넣어준다.
  넣을 위치를 for 문을 이용해 돌려주고 열값만 바뀌면서 word 단어를 하나씩 넣도록 구현해준다.
  
  ```
    words?.forEach((word) => {
            const row = Math.floor(Math.random() * rows);
            const maxCol = cols - word.length;
            const col = Math.floor(Math.random() * (maxCol + 1)); // 실수로 나와서 +1 ex, 6이면 0~5.99 이므로 소수점 버리면 0~5 이므로 +1

            for (let i = 0; i < word.length; i++) {
                grid[row][col + i] = word[i]; // 단어 나열을 위해 +i 로 해서 증가시키면서 단어 넣도록
            }
        });
  ```

- Play페이지 랜덤 소문자 빈 인덱스에 배치
  중첩 for 문으로 순환하여 랜덤 소문자를 넣어준다.

  ```
    const letter = "abcdefghijklmnopqrstuvwxyz";

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                console.log(grid[i][j]);
                if (grid[i][j] === "") {
                    let rel = letter.charAt(
                        Math.floor(Math.random() * letter.length)
                    );

                    grid[i][j] = rel;
                }
            }
        }
  ```
  
  
