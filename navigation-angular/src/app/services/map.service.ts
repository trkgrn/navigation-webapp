import { Injectable } from '@angular/core';
import {GoogleMap, LatLng, Polyline, PolylineOptions} from "@agm/core/services/google-maps-types";
import {parse} from "zipson/lib";
import {AddressService} from "./address.service";
declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class MapService {
  public polylines: Array<Polyline> = [];

  constructor(private addressService:AddressService) { }

  setMapOnAll(map: GoogleMap | null,markers:Array<any>) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  deleteMarkers(markers:Array<any>) {
   this.setMapOnAll(null,markers)
    markers = [];
    return markers;
  }

  async drawDirection(route: any,routeMap:GoogleMap,markers:Array<any>) {
    routeMap.setCenter({
      lat: route.origin.address.coordinate.latitude,
      lng: route.origin.address.coordinate.longitude
    });
    markers = this.deleteMarkers(markers);

    try {
      let response: any = await this.addressService.getMapDataByRouteId(route.routeId).toPromise();
      route.mapData = response.mapData
    } catch (e) {
      console.log(e)
    }

    let event = parse(route.mapData)
    console.log(event)

    let list: any = await this.addressService.getAddressByRouteId(route.routeId).toPromise();
    let labelIndex = 1

    let originMarker = new google.maps.Marker({
      position: {lat: route.origin.address.coordinate.latitude, lng: route.origin.address.coordinate.longitude},
      label: (labelIndex++) + ''
    })
    markers.push(originMarker)

    for (const next of list) {
      let marker = new google.maps.Marker({
        position: {lat: next.coordinate.latitude, lng: next.coordinate.longitude},
        label: (labelIndex++) + ''
      })
      markers.push(marker);

    }

    let destinationMarker = new google.maps.Marker({
      position: {
        lat: route.destination.address.coordinate.latitude,
        lng: route.destination.address.coordinate.longitude
      },
      label: (labelIndex++) + ''
    })
    markers.push(destinationMarker);

    this.setMapOnAll(routeMap, markers);
    this.setDirection(routeMap,event);

    const summaryPanel = document.getElementById(
      'directions-panel'
    ) as HTMLElement;

    summaryPanel.innerHTML = '';
    const myRoute = event.routes[0];

    for (let i = 0; i < myRoute.legs.length; i++) {
      const routeSegment = i + 1;

      summaryPanel.innerHTML +=
        '<h5>Aşama ' + routeSegment + '</h5>';
     summaryPanel.innerHTML += '<b>Baş:</b> '+ myRoute.legs[i].start_address + '<br>';
     summaryPanel.innerHTML += '<b>Son:</b> '+ myRoute.legs[i].end_address + '<br>';
     summaryPanel.innerHTML += '<b>Süre:</b> '+ myRoute.legs[i].duration!.text + '<br>';
      summaryPanel.innerHTML += '<b>Mesafe:</b> '+ myRoute.legs[i].distance!.text + '<br><br>';
    }

    return markers;
  }

  setDirection(routeMap:GoogleMap,event:any){

    const {legs} = event.routes[0];
    const polylineOptions: PolylineOptions = {
      strokeWeight: 6,
      strokeOpacity: 0.55,
      strokeColor: "#FF0000"
    };

    const colors = ['#0000FF', '#d40000', '#0000FF'];

    this.polylines.forEach(polyline => polyline.setMap(null!));

    legs.forEach((leg: { steps: any[]; }, index: string | number) => {

      leg.steps.forEach(step => {
        let nextSegment = google.maps.geometry.encoding.decodePath(step.polyline.points);
        const stepPolyline: Polyline = new google.maps.Polyline(polylineOptions);

        nextSegment.forEach((next: LatLng) => stepPolyline.getPath().push(next));

        this.polylines.push(stepPolyline);
        stepPolyline.setMap(routeMap);
      });
    });



  }




}
