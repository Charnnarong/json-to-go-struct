// https://github.com/golang/lint/blob/8f45f776aaf18cebc8d65861cc70c33c60471952/lint.go#L771
const commonInitialisms = {
    "ACL": true,
    "API": true,
    "ASCII": true,
    "CPU": true,
    "CSS": true,
    "DNS": true,
    "EOF": true,
    "GUID": true,
    "HTML": true,
    "HTTP": true,
    "HTTPS": true,
    "ID": true,
    "IP": true,
    "JSON": true,
    "LHS": true,
    "QPS": true,
    "RAM": true,
    "RHS": true,
    "RPC": true,
    "SLA": true,
    "SMTP": true,
    "SQL": true,
    "SSH": true,
    "TCP": true,
    "TLS": true,
    "TTL": true,
    "UDP": true,
    "UI": true,
    "UID": true,
    "UUID": true,
    "URI": true,
    "URL": true,
    "UTF8": true,
    "VM": true,
    "XML": true,
    "XMPP": true,
    "XSRF": true,
    "XSS": true,
};

const goTypeTable = {
    "boolean": "bool",
    "array_int": "[]int",
    "array_string": "[]string",
    "array_float32": "[]float32",
    "array_float64": "[]float64",
    "array_empty": "[]interface{}",
    "null": "interface{}",
};
export {commonInitialisms , goTypeTable};
