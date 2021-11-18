import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Box, Card, CardContent, CardHeader, Divider } from "@material-ui/core";
import { scaleLinear } from "d3-scale";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { onError } from "src/libs/errorLib.js";
import * as queries from "src/graphql/queries.js";
import countries from "src/components/FormLists/countries.js";

const countrylist = countries;

// url to a valid topojson file
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#7bc3c9", "#086972"]);

const App = () => {
  const [sub, setSub] = useState("");
  const [request, setRequest] = useState([]);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      let user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const a = attributes["sub"];
      setSub(a);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }
  }

  useEffect(() => {
    const getRequests = async () => {
      const {
        data: {
          listBuyers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listBuyers)
      );
      const n = { data: { listBuyers: { items: itemsPage1, nextToken } } };
      const items = await n.data.listBuyers.items;
      setRequest(items);
    };
    getRequests();
  }, []);


  const items2 = [
    "United States of America",
    "United States of America",
    "Germany",
  ];

  function find_duplicate_in_array(array) {
    const count = {};
    const result = [];

    array.forEach((item) => {
      if (count[item]) {
        count[item] += 1;
        return;
      }
      count[item] = 1;
    });

    for (let prop in count) {
      if (count[prop] >= 1) {
        result.push(prop);
      }
    }

    var countriesadd = Object.values(count);
    console.log(countriesadd);
    var sumcountries = countriesadd.reduce((a, b) => a + b, 0);
    console.log(sumcountries);
    const countrykeys = Object.keys(count);
    console.log(countrykeys);

  }

  return (
    <div>
      <Card>
        <CardHeader title="Exposure per Country" />
        <Divider />
        <CardContent>
          <Box position="relative">
            <ComposableMap>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={colorScale(["0.68"])}
                    />
                  ))
                }
              </Geographies>
            </ComposableMap>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
