import {
  Environment,
  Image,
  MeshReflectorMaterial,
  OrbitControls,
  useCursor,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import axios from "axios";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import getUuid from "uuid-by-string";
import { useLocation, useRoute } from "wouter";

export const Gallery3d = () => {
  const [images, setImages] = useState([]);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [ratio, setRatio] = useState(1.61803398875);
  const [zoom, setZoom] = useState(5.2);

  const calculateZoom = () => {
    const { innerWidth } = window;
    if (innerWidth < 800) return 9;
    if (innerWidth < 1000) return 8;
    if (innerWidth < 1300) return 7;
    if (innerWidth < 1600) return 6;
    return 5.2;
  };

  useEffect(() => {
    setZoom(calculateZoom());
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setControlsEnabled(false);
    }
  }, [window.innerWidth]);

  const getImage = (photo) =>
    `${process.env.REACT_APP_BACKEND_URL}/api/images/thumb/${photo}`;

  const fetchImages = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/images/66cc3506cbd23d19d1fd4ed2?limit=8&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        const positions = [
          // Back
          { position: [-0.8, 0, -0.6], rotation: [0, 0, 0] },
          { position: [0.8, 0, -0.6], rotation: [0, 0, 0] },
          // Left
          { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0] },
          { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0] },
          { position: [-2.45, 0, 2.75], rotation: [0, Math.PI / 2.5, 0] },
          // Right
          { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0] },
          { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0] },
          { position: [2.45, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0] },
        ];

        const imagesWithPositions = response.data.gallery.map(
          (image, index) => ({
            ...positions[index % positions.length],
            url: getImage(image.photo),
          })
        );
        setImages(imagesWithPositions);
      })
      .catch((error) => {
        console.error("Error during API call:", error);
      });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 70, position: [0, 2, 15] }}
      style={{
        height: "calc(100vh - 200px)",
        width: "100%",
      }}
    >
      <color attach="background" args={["#191920"]} />
      <fog attach="fog" args={["#191920", 0, 15]} />
      <group position={[0, -0.5, 0]}>
        <Frames
          images={images}
          ratio={ratio}
          setRatio={setRatio}
          zoom={zoom}
          setControlsEnabled={setControlsEnabled}
          controlsEnabled={controlsEnabled}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
      </group>
      <Environment preset="city" />
      {controlsEnabled && <OrbitControls />}
    </Canvas>
  );
};

function Frames({
  images,
  ratio,
  zoom,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
  setControlsEnabled,
}) {
  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, ratio / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
      setControlsEnabled(false);
    } else {
      p.set(0, 0.5, zoom);
      q.identity();

      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      if (isMobile) {
        setControlsEnabled(false);
      } else {
        setControlsEnabled(true);
      }
    }
  });

  useFrame((state, dt) => {
    // if (!controlsEnabled) {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
    // }
  });

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        setLocation(
          clicked.current === e.object ? "/" : "/item/" + e.object.name
        );
      }}
      onPointerMissed={() => setLocation("/")}
    >
      {images.map((props) => (
        <Frame key={props.url} ratio={ratio} {...props} />
      ))}
    </group>
  );
}

function Frame({ url, ratio, setRatio, c = new THREE.Color(), ...props }) {
  const image = useRef();
  const frame = useRef();
  const [, params] = useRoute("/item/:id");
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const name = getUuid(url);
  const isActive = params?.id === name;
  useCursor(hovered);
  useFrame((state, dt) => {
    image.current.material.zoom =
      1.2 +
      (!isActive ? Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 3 : 0);
    easing.damp3(
      image.current.scale,
      [
        0.85 * (!isActive && hovered ? 1.06 : 1),
        0.9 * (!isActive && hovered ? 1.06 : 1),
        1,
      ],
      0.1,
      dt
    );
    easing.dampC(
      frame.current.material.color,
      hovered ? "#f1f1f1" : "white",
      0.1,
      dt
    );
  });

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, ratio, 0.05]}
        position={[0, ratio / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#999"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>
    </group>
  );
}
