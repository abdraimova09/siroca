import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Loader from "../Loader/Loader";
import { useSearchParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useOrdersContext } from "../../helpers/hooks";

function EnhancedTableHead(props) {
  const { sortByName, setSortByName } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell align={"left"}>Код</TableCell>
        <TableCell align={"left"}>
          <TableSortLabel
            active={true}
            direction={sortByName}
            onClick={() =>
              setSortByName(sortByName === "asc" ? "desc" : "asc")
            }>
            Исследование
          </TableSortLabel>
        </TableCell>
        <TableCell align={"left"}>Биоматериал</TableCell>
        <TableCell align={"right"}>Тип усл.</TableCell>
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = props => {
  const { numSelected, searchValue, setSearchValue } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "start", sm: "center" },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div">
        Результаты
      </Typography>
      <Box component="div">
        <TextField
          label="Поиск по коду"
          style={{ width: "200px" }}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </Box>
    </Toolbar>
  );
};

export default function OrdersTable() {
  const { ordersCount, ordersData, ordersLoading, getOrders, ordersError } =
    useOrdersContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState(
    searchParams.get("code") ? searchParams.get("code") : ""
  );
  const [sortByName, setSortByName] = React.useState("asc");
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    searchParams.get("size") ? +searchParams.get("size") : 5
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };
  React.useEffect(() => {
    setSearchParams({
      page: page,
      size: rowsPerPage,
      "sort[0].key": "name",
      "sort[0].value": sortByName,
    });
  }, []);

  React.useEffect(() => {
    if (searchValue) {
      setSearchParams({ page: page + 1, size: rowsPerPage, code: searchValue });
    } else {
      setSearchParams({
        page: page + 1,
        size: rowsPerPage,
        "sort[0].key": "name",
        "sort[0].value": sortByName,
      });
    }
  }, [page, rowsPerPage, searchValue, sortByName]);

  React.useEffect(() => {
    getOrders();
  }, [searchParams]);
  if (ordersLoading && !searchValue && !ordersError && !page) return <Loader />;
  if (ordersError)
    return (
      <Box marginTop={"50px"}>
        <h2>
          {ordersError} <br />
          Loading failed! Please check your internet connection and reload page!
        </h2>
      </Box>
    );
  return (
    <Box sx={{ width: "100%", marginTop: "50px" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              sortByName={sortByName}
              setSortByName={setSortByName}
            />
            <TableBody>
              {ordersData.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell component="th" id={labelId} scope="row">
                      {row.code}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.biomaterialName}</TableCell>
                    <TableCell align="right">Исслед.</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={ordersCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box>
        <Button
          onClick={() => {
            setRowsPerPage(5);
            setPage(0);
            setSortByName("asc");
            setSearchValue("");
          }}
          variant="outlined">
          Сбросить фильтры
        </Button>
        <br />
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Сжать"
        />
      </Box>
    </Box>
  );
}
