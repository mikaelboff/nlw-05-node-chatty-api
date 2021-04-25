import "./websocket/client";
import "./websocket/admin";

import { http } from "./http";

http.listen(3333, () => console.log("moeu"));
