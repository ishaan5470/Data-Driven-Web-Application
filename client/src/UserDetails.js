import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CircularProgress from '@mui/material/CircularProgress';



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}


TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function UserDetails({rows,loading,setLoading}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentRow, setCurrentRow] =  useState({
      Email:'',
      Name:'',
      CreditScore:'',
      CreditLines:'',
      MaskedPhoneNumber:'',
      SubscriptionPlan:''
  });
  
  const basePrice=100; //setting base price to 100
  const pricePerCreditLine=120;
  const pricePerCreditScorePoint=150;
  const [currentSubscription, setCurrentSubscription] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  //finding the empty rows on the last page that is 2 (5->5->3 orignal) exampleeee
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (row)=>{
      setCurrentRow(row);
      calculateSubsciption(row)
      setLoading(true);
      setTimeout(()=>{
          setLoading(false);
          setDialogOpen(true);
      },2000)
  }

  const calculateSubsciption = ()=>{
      const subscription = basePrice + (currentRow.CreditLines * pricePerCreditLine) + (currentRow.CreditScore*pricePerCreditScorePoint) //calculating subscription
      setCurrentSubscription(subscription); 
  }

  return (
      <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
     {loading?(<div style={{width:'100vw', height:'82vh', display:'flex', justifyContent:'center', alignItems:'center'}}><h2>Loading...{loading && <CircularProgress style={{fontSize:40}} thickness={40} />}</h2></div>):(<>
     <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Credit Score</TableCell>
            <TableCell >Credit Lines</TableCell>
            <TableCell >Masked Phone Number</TableCell>
            <TableCell >Subscription Plan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => {
              return(
                <TableRow key={row.name}>
                    <TableCell>
                        {row.Email}
                    </TableCell>
                    <TableCell style={{ width: 160 }} >
                        {row.Name}
                    </TableCell>
                    <TableCell style={{ width: 160 }} >
                        {row.CreditScore}
                    </TableCell>
                    <TableCell>
                        {row.CreditLines}
                    </TableCell>
                    <TableCell style={{ width: 160 }} >
                        {row.MaskedPhoneNumber}
                    </TableCell>
                    <TableCell style={{ width: 160 }} >
                        <Button variant='contained' onClick={()=>handleClick(row)} >Calculate</Button>
                    </TableCell>
                </TableRow>
              )
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
              colSpan={10}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </>
        )}
      </Table>
    </TableContainer>
    <Dialog
        open={dialogOpen}
        onClose={()=>setDialogOpen(false)}
      >
        <DialogContent>
          <DialogContentText style={{fontSize:18}}>
            {currentRow.Name} has a subscription plan of : ${currentSubscription}

            

          </DialogContentText>
          <DialogContentText style={{marginTop:10, fontSize:13}}>
          *
            basePrice=100,
            pricePerCreditLine=120,
            pricePerCreditScorePoint=150
            <DialogContentText style={{marginTop:10, fontSize:13}}>
            *
            SubscriptionPrice = BasePrice + (PricePerCreditLine * CreditLines) + (PricePerCreditScorePoint * CreditScore)
            </DialogContentText>
            

          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}