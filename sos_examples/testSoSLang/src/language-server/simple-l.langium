grammar SimpleL

entry Model:
    statements+=(Statement)*;

Bloc:
    '{'
    statements+=(Statement)*
    '}';

ParallelBloc:
    '|'
    ('|' statements+=Statement)*
    '|';

PeriodicBloc:
    'every' time=INT 'ms'
    bloc=Bloc;

Statement:
    Variable | Expr | Assignment | Bloc | ParallelBloc | PeriodicBloc| While;

Expr:
    VarRef|Plus|If|BooleanExpression;

BooleanExpression:
    Conjunction | Disjunction | BooleanConst | IntegerComparison;

IntegerComparison:
    IntLower | IntGreater | IntEqual;

IntLower:
    '('lhs=Expr '<' rhs=Expr')';

IntGreater:
    '('lhs=Expr '>' rhs=Expr')';

IntEqual:
    '('lhs=Expr '==' rhs=Expr')';


BooleanConst:
    value=('true' | 'false');

Conjunction:
    '('lhs=BooleanExpression '&&' rhs=BooleanExpression')';

Disjunction:
    '('lhs=BooleanExpression '||' rhs=BooleanExpression')';


While:
    'while' '('cond=BooleanExpression ')'
    body=Bloc;

If:
    'if' '('cond=BooleanExpression ')'
    then=Bloc
    ('else' else=Bloc);

Variable:
    'var' name=ID ('=' initialValue=INT)?;
Plus:
    "("left=Expr '+' right=Expr")" ;
Assignment:
    variable=[Variable:ID] '=' expr=Expr;
VarRef:
    theVar=[Variable:ID];











hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
