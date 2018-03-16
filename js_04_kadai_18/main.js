//変数の設定
var total = 20;  //カードの枚数
var speed = 150;  //カードをめくる速度
var returnSec = 1000;  //めくったカードが元に戻る秒数
var travel = [];  //各カードの番号を格納する配列
var index;  //クリックしたカードの並び順
var first = true;  //クリックしたカードが1枚目かどうかの判定用
var card1;  //1枚目に引いたカードの番号
var card2;  //2枚目に引いたカードの番号
var pair = 0;  //正解したカードのペア数

//関数の定義
function cardClose(i,n){//カードを閉じる
  $("#card li:eq("+i+")").stop().animate({ left: "75"}, speed);
  $("#card li:eq("+i+") img").stop().animate({ width: "0",height: "200px"}, speed,
  function(){
    n(i);
  });
}
function omoteOpen(){//表面を開く
  $("#card li:eq("+index+") img").attr("src","img/card"+travel[index]+".jpg");
  $("#card li:eq("+index+") img").stop().animate({ width: "150px",height: "200px"}, speed);
  $("#card li:eq("+index+")").stop().animate({ left: "0"}, speed);
}
function uraOpen(j){//裏面を開く
  $("#card li:eq("+j+") img").attr("src","img/card.jpg");
  $("#card li:eq("+j+") img").stop().animate({ width: "150px",height: "200px"}, speed);
  $("#card li:eq("+j+")").stop().animate({ left: "0"}, speed);
}
function cardlock(){//クリックできないようにカードをロック
  $("#card li:eq("+index+")").addClass("lock");//li要素にクラスlockを追加
}
function alllock(){//全てのカードをロック
  $("#card li").addClass("lock");//li要素にクラスlockを追加
}
function unlock(){//全てのカードをアンロック
  $("#card li").removeClass("lock");//li要素からクラスlockを削除
}
function comparison() {//選んだ2枚のカードの正否
  if(card1==card2){  //2枚が同じカードの場合の処理
    $("#card li:eq("+index+")").addClass("off");  //li要素にクラスoffを追加
    $("#card li:eq("+index1+")").addClass("off");  //li要素にクラスoffを追加
    pair++;
    if(pair==total/2){  //ペアが全て見つかったら
      setTimeout(function(){  //最後のカードがめくられた後にクリア表示
        alert("世界一週達成おめでとう！！")
      }, returnSec);
    }
  } else {  //2枚が違うカードの場合の処理
    setTimeout(function(){
        cardClose(index,uraOpen);
        cardClose(index1,uraOpen);
    }, returnSec);
  }
  first = true;  //1枚目かどうかの判定を有効に
  card2 = 0;  //2枚目のカードの並び順をリセット
  setTimeout(function(){
    unlock();  //全てのカードの.lockを削除
  }, returnSec+speed*2);
}

//カードの番号を配列に格納し、ランダムに並び替える
//その後カード画像の入ったliタグの生成
$(function(){
  for(i=1; i<=total/2; i++) {
    travel.push(i,i);
  }
  travel.sort(function() {
    return Math.random() - Math.random();
  });
  for(i=1; i<=total; i++) {
    $("#card").append("<li><img src='img/card.jpg'></li>");
  }

//カードを選択した際の動作
//クリックしたカードの順番を変数indexに格納
  $("#card li").click(function(){
    index = $("#card li").index(this);
    cardlock();
    cardClose(index,omoteOpen);
 //選択したカードが1枚目のときの処理
    if(first == true){
      index1 = index;
      card1= travel[index];
      first = false;
//選択したカードが2枚目のときの処理
    } else {
      alllock();
      card2 = travel[index];
      comparison();
    }
  });

});
