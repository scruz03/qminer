﻿#include "base.h"
///////////////////////////////////////////////////////////////////////////////
// Google Test
#include "gtest/gtest.h"

#ifdef WIN32
#ifdef _DEBUG
#define DEBUG_NEW new(_NORMAL_BLOCK, __FILE__, __LINE__)
#define new DEBUG_NEW
#endif
#endif

TEST(TStr, Constructors) {
	TStr Default;
	TStr CStr("abc");	
	TStr OneChar('a');
	TStr CopyCStr(CStr); 
	TStr Move(TStr("abc"));
	TStr ChA(TChA("abc"));
	TStr SStr(TSStr("abc"));
	
	EXPECT_EQ(Default, "");
	EXPECT_EQ(CStr, "abc");
	EXPECT_EQ(OneChar, "a");
	EXPECT_EQ(CopyCStr, "abc");
	EXPECT_EQ(Move, "abc");
	EXPECT_EQ(ChA, "abc");
	EXPECT_EQ(SStr, "abc");
}

TEST(TStr, OperatorPlusEquals) {
	TStr Str = "abc";
	TStr Empty;
	// empyt+= full	
	Empty += Str;
	EXPECT_EQ(Empty, "abc");
	// self+= self
	Str += Str;
	EXPECT_EQ(Str, "abcabc");
	Str += TStr();	
	EXPECT_EQ(Str, "abcabc");
	
	// empyt+= full
	Empty = TStr();
	Empty += "abc";
	EXPECT_EQ(Empty, "abc");
	// full+= empty
	Str = "abc";
	Str += "";
	EXPECT_EQ(Str, "abc");

	Str = "abc";
	Str += nullptr;
	EXPECT_EQ(Str, "abc");
}

TEST(TStr, OperatorComparison) {
	TStr Str = "abc";
	TStr Str2 = "Abc";
	TStr Str3 = "abc";
	TStr Str4 = "abc ";
	TStr Empty;
	
	// == operator
	EXPECT_TRUE(Str == Str3);
	EXPECT_TRUE(Empty == Empty);	

	EXPECT_FALSE(Str == Str2);
	EXPECT_FALSE(Str == Str4);
	EXPECT_FALSE(Str == Empty);

	EXPECT_TRUE(Str == "abc");
	EXPECT_TRUE(Empty == "");

	EXPECT_FALSE(Str == "Abc");
	EXPECT_FALSE(Str == "abc ");
	EXPECT_FALSE(Str == "");

	EXPECT_FALSE(Empty == nullptr);

	// != operator
	EXPECT_FALSE(Str != Str3);
	EXPECT_FALSE(Empty != Empty);

	EXPECT_TRUE(Str != Str2);
	EXPECT_TRUE(Str != Str4);
	EXPECT_TRUE(Str != Empty);

	EXPECT_FALSE(Str != "abc");
	EXPECT_FALSE(Empty != "");

	EXPECT_TRUE(Str != "Abc");
	EXPECT_TRUE(Str != "abc ");
	EXPECT_TRUE(Str != "");

	EXPECT_TRUE(Empty != nullptr);
}

TEST(TStr, OperatorIndex) {
	TStr Str = "abc";
	int Len = Str.Len();
	TStr Empty;

	EXPECT_EQ(Str[0], 'a');
	EXPECT_EQ(Str[1], 'b');
	EXPECT_EQ(Str[2], 'c');
		
	// changing character
	Str[2] = 'e';
	EXPECT_EQ(Str[2], 'e');
	EXPECT_EQ(Str.Len(), 3);	
}

TEST(TStr, CStr) {
	TStr Str = "abcdef";
	TStr Empty = "";
	const char* StrCStr = Str.CStr();
	const char* EmptyCStr = Empty.CStr();
	EXPECT_EQ(StrCStr[0], 'a');
	EXPECT_EQ(StrCStr[6], '\0');
	EXPECT_EQ(EmptyCStr[0], '\0');
}

TEST(TStr, CloneCStr) {
	const TStr Str = "abcdef";
	const TStr Empty = "";
	char* StrClone = Str.CloneCStr();
	char* EmptyClone = Empty.CloneCStr();
	EXPECT_EQ(Str, StrClone);
	EXPECT_EQ(Empty, EmptyClone);
}

TEST(TStr, PutCh) {
	TStr Str = "abcdef";
	TStr Empty = "";	
	Str.PutCh(0, 'k');
	Str.PutCh(5, 'k');
	EXPECT_EQ(Str[0], 'k');
	EXPECT_EQ(Str[5], 'k');
#ifndef NDEBUG
	dup2(2, 1); // redirect stdout to stderr (Assert emits a printf to stdout)
	EXPECT_DEATH(Str.PutCh(-1, 'a'), "");
	EXPECT_DEATH(Empty.PutCh(0, 'a'), "");
#endif	
}

TEST(TStr, GetCh) {
	TStr Str = "abcdef";
	TStr Empty = "";
	EXPECT_EQ(Str.GetCh(0), 'a');
	EXPECT_EQ(Str.GetCh(5), 'f');
#ifndef NDEBUG		
	dup2(2, 1);	// redirect stdout to stderr (Assert emits a printf to stdout)
	EXPECT_DEATH(Str.GetCh(-1), "");
	EXPECT_DEATH(Empty.GetCh(0), "");	
#endif	
}

TEST(TStr, LastCh) {
	TStr Str = "abcdef";
	TStr Empty = "";
	EXPECT_EQ(Str.LastCh(), 'f');
#ifndef NDEBUG
	dup2(2, 1); // redirect stdout to stderr (Assert emits a printf to stdout)
	EXPECT_DEATH(Empty.LastCh(), "");
#endif	
}

TEST(TStr, Len) {
	TStr Str = "abcdef";
	TStr Empty = "";
	EXPECT_EQ(Str.Len(), 6);
	EXPECT_EQ(Empty.Len(), 0);
}

TEST(TStr, Empty) {
	TStr Str = "abcdef";
	TStr Empty = "";
	EXPECT_FALSE(Str.Empty());
	EXPECT_TRUE(Empty.Empty());
}

TEST(TStr, Clr) {
	TStr Str = "abcdef";
	TStr Empty = "";
	Str.Clr();
	Empty.Clr();
	EXPECT_EQ(Str, "");
	EXPECT_EQ(Empty, "");
}

TEST(TStr, GetStr) {
	TStr Str = "abcdef";
	TStr Empty = "";
	const TStr& Ref = Str.GetStr();
	Str[0] = 'x';
	EXPECT_EQ(Ref[0], 'x');
	EXPECT_EQ(Ref[1], 'b');
	const TStr& RefEmpty = Empty.GetStr();
	EXPECT_EQ(RefEmpty, "");
}

TEST(TStr, GetMemUsed) {
	TStr Str = "abcdef";
	TStr Empty = "";
	EXPECT_EQ(Str.GetMemUsed(), 8 + 7);
	EXPECT_EQ(Empty.GetMemUsed(), 8);
}

TEST(TStr, Trunc) {
	TStr Str = "   abcdef    ";
	TStr Str2 = "    ";
	TStr Str3 = "abcdef    ";
	TStr Str4 = "    abcdef";
	EXPECT_EQ(Str.GetTrunc(), "abcdef");
	EXPECT_EQ(Str2.GetTrunc(), TStr());	
	EXPECT_EQ(Str.ToTrunc(), "abcdef");
	EXPECT_EQ(Str2.ToTrunc(), TStr());
	EXPECT_EQ(Str3.ToTrunc(), "abcdef");
	EXPECT_EQ(Str4.ToTrunc(), "abcdef");
}

TEST(TStr, Hex) {
	TStr Str = ".a";	
	EXPECT_EQ(Str.GetHex(), "2E61");
	EXPECT_EQ(Str.GetHex().GetFromHex(), Str);
	EXPECT_EQ(Str.ToHex(), "2E61");
	EXPECT_EQ(Str.FromHex(), ".a");	
}

TEST(TStr, SubString) {
	TStr Str = "abcda";
	TStr Empty = "";
	
	EXPECT_EQ(Str.GetSubStr(3), "da");
	EXPECT_EQ(Str.GetSubStr(3,3), "d");

	EXPECT_ANY_THROW(Str.GetSubStr(-1, -1));
	EXPECT_ANY_THROW(Str.GetSubStr(-1, 100));

	Str.InsStr(2, "xk");
	EXPECT_EQ(Str, "abxkcda");
	Str.InsStr(2, "");
	EXPECT_EQ(Str, "abxkcda");
}

TEST(TStr, Del) {
	TStr Str = "aabbaabb";
	TStr Empty = "";
	
	TStr Test = Str;
	Test.DelChAll('a');
	EXPECT_EQ(Test, "bbbb");
	Test.DelChAll('c');
	EXPECT_EQ(Test, "bbbb");
	
	Test = Str;
	Test.DelSubStr(2, 3);
	EXPECT_EQ(Test, "aaaabb");
	Test.DelSubStr(-1, 1);
	EXPECT_EQ(Test, "aabb");
	Test.DelSubStr(2, 5);
	EXPECT_EQ(Test, "aa");
	Test.DelSubStr(-1, 5);
	EXPECT_EQ(Test, "");
	Test.DelSubStr(-1, 5);
	EXPECT_EQ(Test, "");

	Test = Str;
	EXPECT_TRUE(Test.DelStr("ab"));
	EXPECT_EQ(Test, "abaabb");
	EXPECT_FALSE(Test.DelStr("fs"));
	EXPECT_EQ(Test, "abaabb");

	Test = Str;
	EXPECT_EQ(2, Test.DelStrAll("ab"));
	EXPECT_EQ(Test, "abab");
}

TEST(TStr, LeftOfRightOf) {
	TStr Str = "abcdef";
	TStr Empty = "";
	EXPECT_EQ(Str.LeftOf('d'), "abc");
	EXPECT_EQ(Str.RightOf('c'), "def");
	EXPECT_EQ(Str.RightOf('f'), "");
	EXPECT_EQ(Empty.LeftOf('d'), "");
	EXPECT_EQ(Str.LeftOf('a'), "");
	EXPECT_EQ(Empty.RightOf('c'), "");

	TStr Str2 = "abcdefabcdef";
	EXPECT_EQ(Str2.LeftOfLast('d'), "abcdefabc");
	EXPECT_EQ(Str2.RightOfLast('c'), "def");
	EXPECT_EQ(Empty.LeftOfLast('d'), "");
	EXPECT_EQ(Empty.RightOfLast('c'), "");
}

TEST(TStr, Search) {
	TStr Str = "abcdaaba";
	int Len = Str.Len();
	EXPECT_EQ(Str.CountCh('a'), 4);
	EXPECT_EQ(Str.CountCh('b'), 2);
	EXPECT_EQ(Str.CountCh('e'), 0);

	EXPECT_TRUE(Str.IsChIn('a'));
	EXPECT_TRUE(Str.IsChIn('b'));
	EXPECT_FALSE(Str.IsChIn('e'));	

	EXPECT_TRUE(Str.IsStrIn(Str));
	EXPECT_TRUE(Str.IsStrIn(""));
	EXPECT_TRUE(Str.IsStrIn("bcd"));
	EXPECT_TRUE(Str.IsStrIn("ab"));
	EXPECT_FALSE(Str.IsStrIn("eba"));


	EXPECT_EQ(Str.CountCh('a', 1), 3);
	EXPECT_EQ(Str.CountCh('a', 10), 0);
	EXPECT_EQ(Str.CountCh('b', 2), 1);
	EXPECT_EQ(Str.CountCh('e', 1), 0);

	EXPECT_EQ(Str.SearchCh('a'), 0);
	EXPECT_EQ(Str.SearchCh('b'), 1);
	EXPECT_EQ(Str.SearchCh('e'), -1);

	EXPECT_EQ(Str.SearchCh('a', 1), 4);
	EXPECT_EQ(Str.SearchCh('b', 2), 6);
	EXPECT_EQ(Str.SearchCh('e', 1), -1);

	EXPECT_EQ(Str.SearchChBack('a'), Len - 1);
	EXPECT_EQ(Str.SearchChBack('b'), Len - 2);
	EXPECT_EQ(Str.SearchChBack('e'), -1);

	EXPECT_EQ(Str.SearchChBack('a', Len - 2), Len - 3);
	EXPECT_EQ(Str.SearchChBack('b', Len - 3), 1);;
	EXPECT_EQ(Str.SearchChBack('e', 3), -1);	

	EXPECT_EQ(Str.SearchStr("a"), 0);
	EXPECT_EQ(Str.SearchStr("b"), 1);
	EXPECT_EQ(Str.SearchStr("e"), -1);
	EXPECT_EQ(Str.SearchStr(""), 0);

	EXPECT_EQ(Str.SearchStr("a", 1), 4);
	EXPECT_EQ(Str.SearchStr("b", 2), 6);
	EXPECT_EQ(Str.SearchStr("e", 1), -1);
}

TEST(TStr, StartsWith) {
	TStr Str = "abcdef";
	EXPECT_TRUE(Str.StartsWith("abc"));
	EXPECT_TRUE(Str.StartsWith(TStr("abc")));

	EXPECT_FALSE(Str.StartsWith("bbc"));
	EXPECT_FALSE(Str.StartsWith(TStr("bbc")));

	// Empty string is a prefix of every string
	EXPECT_TRUE(Str.StartsWith("")); // starts with empty strin
	EXPECT_TRUE(Str.StartsWith(TStr()));

	EXPECT_FALSE(Str.StartsWith("abcdefg"));
	EXPECT_FALSE(Str.StartsWith("AB"));
	EXPECT_FALSE(Str.StartsWith("abcdef "));
}

TEST(TStr, EndsWith) {
	TStr Str = "abcdef";
	EXPECT_TRUE(Str.EndsWith("def"));
	EXPECT_TRUE(Str.EndsWith(TStr("def")));

	EXPECT_FALSE(Str.EndsWith("ddf"));
	EXPECT_FALSE(Str.EndsWith(TStr("ddf")));

	// Empty string is a suffix of every string
	EXPECT_TRUE(Str.EndsWith("")); // ends with empty string
	EXPECT_TRUE(Str.EndsWith(TStr())); // ends with empty string

	EXPECT_FALSE(Str.EndsWith("aabcdef"));
	EXPECT_FALSE(Str.EndsWith("EF"));
	EXPECT_FALSE(Str.EndsWith(" abcdef"));
}

TEST(TStr, ChangeCh) {
	TStr Str = "aaabbaaac";
	TStr Empty;
	int ChN = 0;
	ChN = Empty.ChangeCh('a', 'c');
	EXPECT_EQ(Empty, "");
	EXPECT_EQ(ChN, -1);
	ChN = Str.ChangeCh('a', 'c');
	EXPECT_EQ(Str, "caabbaaac");
	EXPECT_EQ(ChN, 0);
	ChN = Str.ChangeCh('a', 'c', 3);
	EXPECT_EQ(Str, "caabbcaac");
	EXPECT_EQ(ChN, 5);
	ChN = Str.ChangeCh('a', 'c', 10);
	EXPECT_EQ(Str, "caabbcaac");
	EXPECT_EQ(ChN, -1);

#ifndef NDEBUG
	dup2(2, 1); // redirect stdout to stderr (Assert emits a printf to stdout)
	EXPECT_DEATH(Str.ChangeCh('a', '\0'), "");
#endif
}

TEST(TStr, ChangeChAll) {
	TStr Str = "abac";
	TStr Empty;
	int Changes = 0;
	Changes = Empty.ChangeChAll('a', 'c');
	EXPECT_EQ(Empty, "");
	EXPECT_EQ(Changes, 0);
	Changes = Str.ChangeChAll('a', 'c');
	EXPECT_EQ(Str, "cbcc");
	EXPECT_EQ(Changes, 2);
}

TEST(TStr, ChangeStr) {
	TStr Str = "abac";
	TStr Empty;
	int ChangeN = 0;
	ChangeN = Empty.ChangeStr("ab", "ac");
	EXPECT_EQ(Empty, "");
	EXPECT_EQ(ChangeN, -1);
	ChangeN = Str.ChangeStr("ab", "abab");
	EXPECT_EQ(Str, "ababac");
	EXPECT_EQ(ChangeN, 0);
}

TEST(TStr, ChangeStrAll) {
	TStr Str = "abac";
	TStr Empty;
	int Changes = 0;
	Changes = Empty.ChangeStrAll("ab", "ac");
	EXPECT_EQ(Empty, "");
	EXPECT_EQ(Changes, 0);
	Changes = Str.ChangeStrAll("", "a"); // replacing and empty string should do nothing
	EXPECT_EQ(Str, "abac");
	EXPECT_EQ(Changes, 0);
	Changes = Str.ChangeStrAll("ab", "abab");
	EXPECT_EQ(Str, "ababac");
	EXPECT_EQ(Changes, 1);
	Changes = Str.ChangeStrAll("ab", "abab");
	EXPECT_EQ(Str, "ababababac");
	EXPECT_EQ(Changes, 2);
	Changes = Str.ChangeStrAll("ababababac", "");
	EXPECT_EQ(Str, "");
	EXPECT_EQ(Changes, 1);
	Changes = Str.ChangeStrAll("", "a"); // replacing and empty string should do nothing
	EXPECT_EQ(Str, "");
	EXPECT_EQ(Changes, 0);
}

TEST(TStr, Reverse) {
	TStr Str = "abac";
	TStr Empty;
	int Changes = 0;	
	EXPECT_EQ(Empty.Reverse(), "");	
	EXPECT_EQ(Str.Reverse(), "caba");
	EXPECT_EQ(Str.Reverse().Reverse(), Str);	
}

TEST(TStr, ParseBool) {
	TStr StrTrue = "T";
	TStr StrFalse = "F";
	TStr Empty = "";
	TStr Str = "abc";
	bool val;

	EXPECT_TRUE(StrTrue.IsBool(val));
	EXPECT_TRUE(val);
	EXPECT_FALSE(Str.IsBool(val));
	EXPECT_TRUE(val); // val was not changed, it is still set to true	
	EXPECT_TRUE(StrFalse.IsBool(val));
	EXPECT_FALSE(val);	
	EXPECT_FALSE(Empty.IsBool(val));
	EXPECT_FALSE(val); // val was not changed, it is still set to false
}

TEST(TStr, ParseInt) {
	int Num = 0;
	EXPECT_TRUE(TStr("1234").IsInt());
	EXPECT_TRUE(TStr("2147483647").IsInt());
	EXPECT_TRUE(TStr("-2147483648").IsInt());
	EXPECT_FALSE(TStr("-21648.0").IsInt());
	
	EXPECT_TRUE(TStr("1234").IsInt(Num));
	EXPECT_EQ(1234, Num);
	EXPECT_TRUE(TStr("2147483647").IsInt(Num));
	EXPECT_EQ(2147483647, Num);
	EXPECT_TRUE(Num > 0);
	EXPECT_TRUE(TStr("-2147483648").IsInt(Num));
	EXPECT_TRUE(Num < 0);
	EXPECT_EQ(-2147483647 - 1, Num);
		
	EXPECT_TRUE(TStr("-2147483648").IsInt(true, TInt::Mn, TInt::Mx, Num));
	EXPECT_FALSE(TStr("-2147483649").IsInt(true, TInt::Mn, TInt::Mx, Num));		

	EXPECT_FALSE(TStr("salad2147483649").IsInt());
	EXPECT_FALSE(TStr("2147483649fingers").IsInt());

	EXPECT_EQ(TStr("2147483647").GetInt(), 2147483647);
	EXPECT_EQ(TStr("2147483648").GetInt(123), 123);
	EXPECT_EQ(TStr("2147483648").GetInt(123), 123);
	EXPECT_EQ(TStr("000000000000123").GetInt(), 123);
	EXPECT_EQ(TStr("2147483647foo").GetInt(123), 123);
}

TEST(TStr, OperatorPlus) {
	TStr Str = "abc";
	TStr Empty;
	
	EXPECT_EQ(Empty + Str, "abc");
	EXPECT_EQ(Str + Empty, "abc");
	EXPECT_EQ(Empty + "abc", "abc");
	EXPECT_EQ(Str + "", "abc");	
	EXPECT_EQ(Str + nullptr, "abc");
}


