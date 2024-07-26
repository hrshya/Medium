import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@hrshya/medium-common";


export const userRouter = new Hono<{
    Bindings: {
            DATABASE_URL: string,
            JWT_SECRET : string
    }
}>()


userRouter.post('/signup', async(c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);

    if(!success){
        c.status(411)
        return c.json({
            message : "Inputs not correct"
        })
    }
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
  
    try {
  
      const user = await prisma.user.create({
        data : {
          email : body.email,
          password : body.password,
        }
      })
    
      const token = await sign({ id : user.id }, c.env.JWT_SECRET)
    
      return c.json({
        jwt :  token
      })
  
    } catch (e) {
      console.log(e)
      c.status(411)
      return c.json("Invalid")
    }
  
  })
  
  userRouter.post('/signin', async(c) => {

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);

    if(!success){
        c.status(411)
        return c.json({
            message : "Inputs not correct"
        })
    }
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
  
  try {
    
    const user = await prisma.user.findUnique({
      where : {
        email : body.email,
        password : body.password
      }
    })
  
    if(!user){
      c.status(403)
      return c.json({ msg : "Incorrect credentials" });
    }
  
    const jwt = await sign({id : user.id}, c.env.JWT_SECRET );
    return c.json({ jwt });
  
  } catch (e) {
    
    c.status(411)
    return c.json("Invalid")
  
  }
  
})
  