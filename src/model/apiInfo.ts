type ApiInfo = {
    uriWithParam:string,
    headers:Headers,
    method:Method
}
  
type Headers = {
Accept?: string;
Authorization?: string;
} | undefined

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'

export type { ApiInfo, Headers, Method };