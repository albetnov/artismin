import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    InputAdornment,
    TextField
} from "@mui/material";
import {Mail, Password, Visibility, VisibilityOff} from "@mui/icons-material";
import loginModel from "./Models/loginModel";

export default function Login() {
    const {isPasswordVisible, setPasswordVisibility} = loginModel();

    return (
        <Container maxWidth="xl">
            <Box display="grid" minHeight="99vh" gridTemplateColumns={{sm: "1fr", lg: "1fr 1fr"}}>
                <img src="https://source.unsplash.com/1920x1080?code"
                     alt="Coding"
                     style={{width: "100%", minHeight: "100%", objectFit: "cover"}}
                />
                <Box p={10} alignSelf="center">
                    <Card>
                        <CardHeader
                            title="Login Form"
                        />
                        <CardContent>
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Mail/>
                                        </InputAdornment>
                                    )
                                }}
                                margin="dense" fullWidth label="Mail Address"/>
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Password/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button onClick={setPasswordVisibility}>
                                                {isPasswordVisible ? <Visibility/> : <VisibilityOff/>}
                                            </Button>
                                        </InputAdornment>
                                    )
                                }}
                                margin="dense" fullWidth sx={{display: "block"}} label="Password"
                                type={isPasswordVisible ? "text" : "password"}
                            />
                        </CardContent>
                        <CardActions>
                            <Button sx={{mx: "auto", width: "100%"}}>Login</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
        </Container>
    )
}