"use client";
import { FormGroup, FormControlLabel, Switch, Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddDialog from "@/components/list/Add";
import { DataGrid } from "@mui/x-data-grid";

const Page = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = useState(false);
  const [editType, setEditType] = useState("add");
  const [editValues, setEditValues] = useState(null);

 

  useEffect(() => {
    const fetchGoods = async () => {
      const response = await fetch(`/api/list`, {
        method: "POST",
        body: JSON.stringify({ pageNo, pageSize }),
      });
      const data = await response.json();
      console.log(data);
      const array = data.data.map((item) => {
        const { _id, ...rest } = item;
        return { id: _id, ...rest };
      });
      setList(array);
      setTotal(data.total);
    };
    fetchGoods();
  }, [pageSize, pageNo]);

  

  const handleClickOpen = () => {
    setEditType("add");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (e, rowData) => {
    setEditType("edit");
    setEditValues(rowData);
    e.stopPropagation();
    setOpen(true);
  };

  const handleDelete = (id) => {
    const deleteGood = async () => {
      const response = await fetch(`/api/list?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
      }
    };
    deleteGood();
  };

  const handlePagination = (pageNo, pageSize) => {
    console.log("page", pageNo, pageSize);
    setPageNo(pageNo + 1);
    setPageSize(pageSize);
  };

  const columns = [
    { field: "name", headerName: "名称", width: 200, sortable: false },
    {
      field: "type",
      headerName: "分类",
      width: 150,
      valueGetter: (params) => {
        const type = params.value;
        const TYPEMAP = {
          1: "玩具",
          2: "衣服",
          3: "鞋子",
        };
        return TYPEMAP[type] || "";
      },
    },
    { field: "price", headerName: "价格" },
    { field: "count", headerName: "数量" },
    {
      field: "id",
      headerName: "操作",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={(e) => {
                handleEdit(e, params.row);
              }}
            >
              编辑
            </Button>
            <Button
              onClick={() => {
                handleDelete(params.row.id);
              }}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <div className="flex h-full">
      <div className="flex-none  w-full">
        <div></div>
        <div className="text-lg">New Releases</div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add
        </Button>
        <AddDialog
          open={open}
          onClose={handleClose}
          defaultValues={editValues}
          editType={editType}
        ></AddDialog>
        <div className=" overflow-x-hidden overflow-y-auto bg-white h-full">
          <DataGrid
            rows={list}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            rowCount={total}
            paginationMode="server"
            sortingMode="server"
            pageSizeOptions={[2, 5, 10]}
            checkboxSelection
            onPaginationModelChange={(model, details) => {
              console.log(model)
              handlePagination( model.page, model.pageSize);
            }}
          />
        </div>
      </div>
      <div className="w-full"></div>
    </div>
  );
};

export default Page;
