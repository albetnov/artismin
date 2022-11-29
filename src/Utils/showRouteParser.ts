import { DocumentData } from "firebase/firestore";

interface RouteVisibility {
  "/channels": boolean;
  "/roadmap": boolean;
  "/rules": boolean;
  "/roles": boolean;
  [key: string]: boolean;
}

export default function showRouteParser(settings: DocumentData[]): RouteVisibility {
  const routeVisibility = {
    "/channels": false,
    "/roadmap": false,
    "/rules": false,
    "/roles": false,
  };

  settings.forEach((item) => {
    switch (item.id) {
      case "enable_bye":
        routeVisibility["/channels"] = item.value;
        break;
      case "enable_welcome":
        routeVisibility["/channels"] = item.value;
        break;
      case "enable_roadmap":
        routeVisibility["/roadmap"] = item.value;
        break;
      case "enable_rules":
        routeVisibility["/channels"] = item.value;
        routeVisibility["/rules"] = item.value;
        routeVisibility["/roles"] = item.value;
        break;
    }
  });

  return routeVisibility;
}
