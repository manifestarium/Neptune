import { Component, OnInit, Injectable } from '@angular/core';
// import {MdButton} from '@angular2-material/button';
// import {MdCard} from '@angular2-material/card';
// import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
// import {MdSlideToggle} from '@angular2-material/slide-toggle';
// import {MdToolbar} from '@angular2-material/toolbar';
import * as _ from 'lodash';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  //directives: [MdButton, MdCard, MdIcon, MdSlideToggle, MdToolbar],
  //providers: [MdIconRegistry]
})
export class AppComponent implements OnInit {
    ratio: number;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    gl: any;
    renderer: any;
    constructor()
    {
        app = this;
    }

    mouseup(e: MouseEvent)
    {
        if(e.button == 2)
        {
            // var scaleVector3 = new THREE.Vector3(app.crossScaleX, app.crossScaleY, app.crossScaleZ);
            // var dir = _.clone<THREE.Vector3>(app.controls.target).sub(_.clone<THREE.Vector3>(app.camera.position));
            // var ray = new THREE.Ray(app.camera.position, dir);
            // var point = ray.intersectPlane(app.plane);

            // if(point)
            // {
            //     app.controls.target.set(point.x, point.y, point.z);
            // }
        }
    }

    ngOnInit()
    {
        // create a scene, that will hold all our elements such as objects, cameras and lights.
        this.scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer({ alpha: true, clearColor: 0xffffff, antialias: false });
        this.gl = this.renderer.context;
        this.gl.enable(this.gl.DEPTH_TEST);
        this.renderer.autoClear = false;
        this.renderer.state.setStencilTest(true);
        this.renderer.sortObjects = true;
        this.renderer.state.setDepthTest(true);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnabled = true;
        
        // position and point the camera to the center of the scene
        this.camera.position.x = 15;
        this.camera.position.y = 16;
        this.camera.position.z = 13;
        this.camera.lookAt(this.scene.position);

        // add the output of the renderer to the html element
        document.body.appendChild(this.renderer.domElement);

        
        // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(20, 20);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 0;
        plane.position.y = -2;
        plane.position.z = 0;

        // add the plane to the scene
        this.scene.add(plane);

        // create a cube
        var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 'red'});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        cube.castShadow = true;

        // add the cube to the scene
        this.scene.add(cube);

        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(10, 20, 20);
        spotLight.shadowCameraNear = 20;
        spotLight.shadowCameraFar = 50;
        spotLight.castShadow = true;

        this.scene.add(spotLight);
        this.animate();  
        this.render();    
        window.addEventListener('resize', this.handleResize, false);
    }

    handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate()
    {
        //app.controls.update();
        requestAnimationFrame(app.animate);
        app.render();
    }

    render()
    {
        app.renderer.clear();
        app.renderer.render(app.scene, app.camera);
        app.renderer.clearDepth();
    }
}

var app: AppComponent;
