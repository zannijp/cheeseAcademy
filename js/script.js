
window.addEventListener("DOMContentLoaded", init);
function init() {
    // レンダラーを作成
    const canvasElement = document.querySelector('#cheese');
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvasElement,
    });
 
    // サイズ指定
    const sizes = {
        width: innerWidth,
        height: innerHeight
    };
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sizes.width, sizes.height);
 
    // シーンを作成
    const scene = new THREE.Scene();
 
    // 環境光源を作成
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.25;
    scene.add(ambientLight);
 
    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.intensity = 2;
    directionalLight.position.set(-10, 3, 6); //x,y,zの位置を指定
    scene.add(directionalLight);
 
    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 10000);
    camera.position.set(0, 0, 0);
 
    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, canvasElement);
    //controls.enableDamping = false;
    //controls.dampingFactor = 0.2;
    // to disable zoom
    controls.enableZoom = false;
    // to disable rotation
    controls.enableRotate = false;
    // to disable pan
    controls.enablePan = false;
 
    // 3Dモデルの読み込み
    const loader = new THREE.GLTFLoader();
	let model = null;
    if(window.innerWidth < 768) {
    loader.load( //mobile
　　  //3Dモデルファイルのパスを指定
        'models/GlobeAnim.glb',
        function (glb) {
            model = glb.scene;
            model.name = "cheese";
            model.scale.set(6.0, 6.0, 6.0);
            model.position.set(0,-8.5,-50);
            scene.add( glb.scene );
        },
        function (error) {
            console.log(error);
        }
    );
} else {
    loader.load( //pc
　　  //3Dモデルファイルのパスを指定
        'models/GlobeAnim.glb',
        function (glb) {
            model = glb.scene;
            model.name = "cheese";
            model.scale.set(12.0, 12.0, 12.0);
            model.position.set(17,0,-50);
            scene.add( glb.scene );
        },
        function (error) {
            console.log(error);
        }
    );
}
 // レスポンシブ対応の処理
 function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// アニメーションループの設定
function animate() {
    requestAnimationFrame(animate);
    model.rotation.x += 0.001;
    model.rotation.y += 0.001;
    renderer.render(scene, camera);
}
// アニメーションを実行
animate();

// 初回実行時のウィンドウリサイズ処理
onWindowResize();
    // リアルタイムレンダリング
	tick();
	function tick() {
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(tick);
	}
}


window.addEventListener("DOMContentLoaded", () => {
    // 星を表示するための親要素を取得
    const stars = document.querySelector(".stars");
  
    // 星を生成する関数
    const createStar = () => {
      const starEl = document.createElement("span");
      starEl.className = "star";
      const minSize = 1; // 星の最小サイズを指定
      const maxSize = 2; // 星の最大サイズを指定
      const size = Math.random() * (maxSize - minSize) + minSize;
      starEl.style.width = `${size}px`;
      starEl.style.height = `${size}px`;
      starEl.style.left = `${Math.random() * 100}%`;
      starEl.style.top = `${Math.random() * 100}%`;
      starEl.style.animationDelay = `${Math.random() * 10}s`;
      stars.appendChild(starEl);
    };
  
    // for文で星を生成する関数を指定した回数呼び出す
    for (let i = 0; i <= 500; i++) {
      createStar();
    }
  });

  $(function() {

    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 100) {
            $(".float-button__wrap").fadeIn(300);
            } else {
            $(".float-button__wrap").fadeOut(300);
        }

        const scrollHeight = $(document).height();/*ページ全体の高さ*/
        const scrollPosition = $(window).height() + $(window).scrollTop();/*ページの一番上からスクロールされた距離*/
        const footHeight = $("footer").height();/*フッターの高さ*/

        if ( scrollHeight - scrollPosition  <= footHeight ) {
            $(".float-button__wrap").css({
                "position":"absolute",
                "bottom": 10  + footHeight,
            });
        } else {
            $(".float-button__wrap").css({
                "position":"fixed",
                "bottom": "10px",
            });
        }
    });

});