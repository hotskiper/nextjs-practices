"use client";

import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

const AddDialog = (props) => {
  const { onClose, open, editType, defaultValues } = props;
  const dialogTitle = editType === "edit" ? "Edit product" : "Add a product";
  
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editType === "edit") {
      setValue('name', defaultValues.name)
      setValue('type', defaultValues.type)
      setValue('count', defaultValues.count)
      setValue('price', defaultValues.price)
    } else {
      setValue('name', '')
      setValue('type', '')
      setValue('count', '')
      setValue('price', '')
    }
  }, [editType, defaultValues, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    const addGood = async () => {
      const response = await fetch(`/api/list/add`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        enqueueSnackbar("success", {
          variant: "success",
          autoHideDuration: 3000,
        });
        handleClose();
      } else {
        enqueueSnackbar("failed", { variant: "info", autoHideDuration: 3000 });
      }
    };
    const updateGood = async (id)=>{
      const response = await fetch(`api/list`, {
        method: 'PATCH',
        body: JSON.stringify({...data, id})
      })
      if (response.ok) {
        enqueueSnackbar("success", {
          variant: "success",
          autoHideDuration: 3000,
        });
        handleClose();
      } else {
        enqueueSnackbar("failed", { variant: "info", autoHideDuration: 3000 });
      }
    }
    if(editType === 'edit'){
      const id = defaultValues.id;
      updateGood(id);
    }else {
      addGood();
    }
    
  };

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    reset();
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent className=" pt-4">
          <Controller
            name="name"
            control={control}
            rules={{ required: "请输入名称" }}
            defaultValue=''
            render={({ field: {onChange, onBlur, value} }) => {
              return (
                <TextField
                  label="名称"
                  className="mb-4"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              );
            }}
          />

          <Controller
            name="type"
            control={control}
            rules={{ required: "请选择类型" }}
            defaultValue=''
            render={({ field }) => (
              <FormControl fullWidth className="mb-4" error={!!errors.type}>
                <InputLabel id="demo-id">类型</InputLabel>
                <Select label="类型" labelId="demo-id" {...field}>
                  <MenuItem value={1}>玩具</MenuItem>
                  <MenuItem value={2}>衣服</MenuItem>
                  <MenuItem value={3}>鞋子</MenuItem>
                </Select>
                <FormHelperText>{errors.type?.message}</FormHelperText>
              </FormControl>
            )}
          ></Controller>

          <Controller
            name="price"
            control={control}
            rules={{ required: "请输入价格" }}
            defaultValue=''
            render={({ field }) => (
              <TextField
                label="价格"
                className="mb-4"
                error={!!errors.price}
                helperText={errors.price?.message}
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="count"
            control={control}
            rules={{ required: "请输入数量" }}
            defaultValue=''
            render={({ field }) => (
              <TextField
                label="数量"
                error={!!errors.count}
                helperText={errors.count?.message}
                fullWidth
                {...field}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button type="submit">确定</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddDialog;
